import { getEditorRoot } from '../app/editor_root.js'

/**
 * The editor root holds focus whenever no specific control inside the editor
 * does, so keyboard commands keep reaching the editor. Be careful: calling
 * this at the wrong time takes focus away from an input the user is typing in.
 */
export function loseAnyFocus(): void {
  getEditorRoot()?.focus({ preventScroll: true })
}

export function isFocusOnEditor(): boolean {
  const root = getEditorRoot()
  return root !== null && document.activeElement === root
}
