// Compiles Streetmix's SVG icons and illustrations into the symbol sprite
// sheets the editor loads at /assets/icons.svg and /assets/images.svg.
// Ported from Streetmix's server (app/lib/svg_sprite.ts). Rerun after
// editing any SVG under src/streetmix/packages/{variant-icons,illustrations}.
import fs from 'node:fs/promises'
import path from 'node:path'
import SVGSpriter from 'svg-sprite'
import Vinyl from 'vinyl'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public/assets')

const sprites = [
  ['src/streetmix/packages/variant-icons/icons', 'icons', 'icon'],
  ['src/streetmix/packages/illustrations/images', 'images', 'image'],
]

async function compile(source, filename, namespace) {
  const base = path.join(root, source)
  const spriter = new SVGSpriter({
    dest: outDir,
    shape: { id: { generator: `${namespace}-%s` } },
    mode: { symbol: { dest: '.', sprite: filename, inline: true } },
  })

  for await (const rel of fs.glob('**/*.svg', { cwd: base })) {
    const file = path.join(base, rel)
    // Vinyl keeps subdirectories in the symbol id, as Streetmix does
    spriter.add(
      new Vinyl({ base, path: file, contents: await fs.readFile(file) }),
    )
  }

  const { result } = await spriter.compileAsync()
  for (const mode of Object.values(result)) {
    for (const sprite of Object.values(mode)) {
      await fs.mkdir(path.dirname(sprite.path), { recursive: true })
      await fs.writeFile(sprite.path, sprite.contents)
      console.log(`wrote ${path.relative(root, sprite.path)}`)
    }
  }
}

for (const args of sprites) await compile(...args)
