# Streetmix (vendored)

Snapshot of [streetmix/streetmix](https://github.com/streetmix/streetmix)
at commit `d52ccd06da5392118a76bd684191db52a474dce3` (2026-11-03),
copied once and modified for this app. Not synced with upstream.

- Code: AGPL-3.0-or-later (see `LICENSE`).
- Illustrations (`packages/illustrations`): CC BY-SA 4.0
  (see `packages/illustrations/LICENSE`).

Server, tests, docs and Cypress were not copied.

## Embedding

The editor is mounted inside the app's pages through `StreetEditor.tsx`.
Only the street view, palette, dialogs and toasts are used; the standalone
site's menu bar, nameplate, welcome panel, sky picker, debug and print
views were removed.

- **One editor at a time.** Streetmix keeps a single global store and editor
  root, so only one `StreetEditor` may be mounted.
- **Lifecycle.** `loadOnce()` (`client/src/app/initialization.js`) loads
  settings, sprites and locale once per page. `attach(root)` connects
  listeners, store observers and body classes while an editor is mounted;
  the returned `detach()` removes them.
- **Keyboard and focus.** Keyboard input and focus are scoped to the editor
  root (`client/src/app/editor_root.ts`), not `window` or `document.body`.
  Floating UI tooltips and popups portal into the editor root.
- **Layout.** `StreetView` measures against its own container, not the
  window, and re-lays out when that container resizes.
- **CSS.** `scripts/postcssScopeStreetmix.ts` prefixes every selector under
  `src/streetmix` with `.streetmix-root`, rewrites `rem` against the
  editor's base font size, and wraps it all in `@layer streetmix`, which
  `src/index.css` orders above Tailwind's preflight and below its utilities.
