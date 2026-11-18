/**
 * The element the embedded editor is mounted in. Keyboard listeners,
 * focus management, and floating UI portals are scoped to it, so the
 * editor never reacts to or styles anything outside its own box.
 */
let editorRoot: HTMLElement | null = null

export function setEditorRoot(el: HTMLElement | null): void {
  editorRoot = el
}

export function getEditorRoot(): HTMLElement | null {
  return editorRoot
}
