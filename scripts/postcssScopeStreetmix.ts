import path from 'node:path';
import type { AtRule, Plugin, Rule } from 'postcss';

const ROOT = '.streetmix-root';
const LAYER = 'streetmix';

// Vendored Streetmix CSS was written to own the whole page. This scopes it to
// the editor's element so it can't style the rest of the app:
// - every selector is prefixed with `.streetmix-root`
// - `rem` is rewritten against the editor's base font size, because Streetmix
//   would otherwise need `html { font-size: 13px }`
// - everything goes in `@layer streetmix`; index.css orders that layer
//   above Tailwind's preflight and below its utilities.
export function postcssScopeStreetmix(dir: string): Plugin {
  const scopeDir = path.resolve(dir) + path.sep;

  return {
    postcssPlugin: 'postcss-scope-streetmix',
    Once(root, { AtRule }) {
      const file = root.source?.input.file;
      if (!file || !path.resolve(file).startsWith(scopeDir)) return;

      root.walkRules((rule) => {
        if (isTopLevel(rule) && !isInKeyframes(rule)) {
          rule.selectors = rule.selectors.map(scopeSelector);
        }
      });

      root.walkDecls((decl) => {
        decl.value = decl.value.replace(
          /(^|[^\w.-])(-?\d*\.?\d+)rem\b/g,
          (_, before: string, n: string) =>
            `${before}calc(${n} * var(--font-size-base))`,
        );
      });

      const layer = new AtRule({ name: 'layer', params: LAYER });
      root.each((node) => {
        if (
          node.type === 'atrule' &&
          (node.name === 'charset' || node.name === 'import')
        ) {
          return;
        }
        layer.append(node.clone());
        node.remove();
      });
      root.append(layer);
    },
  };
}
postcssScopeStreetmix.postcss = true;

function isTopLevel(rule: Rule) {
  let parent = rule.parent;
  while (parent && parent.type !== 'root') {
    if (parent.type === 'rule') return false;
    parent = parent.parent;
  }
  return true;
}

function isInKeyframes(rule: Rule) {
  const parent = rule.parent;
  return (
    parent?.type === 'atrule' && /keyframes$/.test((parent as AtRule).name)
  );
}

function scopeSelector(selector: string) {
  if (selector.includes(ROOT)) return selector;
  const page = /^(html|body|:root)(?=[.:[\s]|$)\S*/.exec(selector);
  if (!page) return `${ROOT} ${selector}`;

  // A bare page rule (`:root { --var }`, `body { … }`) styled Streetmix's
  // whole page, which is now the editor root.
  const rest = selector.slice(page[0].length).trimStart();
  if (!rest && page[0] === page[1]) return ROOT;

  // Otherwise it reads page-level state (`body.safari`, `:root[dir=rtl]`);
  // keep that compound first and scope what follows it.
  return rest ? `${page[0]} ${ROOT} ${rest}` : `${page[0]} ${ROOT}`;
}
