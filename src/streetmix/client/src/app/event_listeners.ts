import { onBodyMouseMove, onBodyMouseUp } from '../segments/drag_and_drop.js'
import { onGlobalKeyDown } from './keyboard_commands.js'

/**
 * Pointer listeners stay on `window` because a resize drag can continue
 * outside the editor's box. Keyboard input is scoped to the editor root.
 * Returns a function that removes all listeners.
 */
export function addEventListeners(root: HTMLElement): () => void {
  // TODO: these global event listeners only handle resize dragging.
  // We should encapsulate this functionality into the resize component and
  // remove the global listeners.
  window.addEventListener('pointermove', onBodyMouseMove)
  window.addEventListener('pointerup', onBodyMouseUp)
  root.addEventListener('keydown', onGlobalKeyDown)

  return () => {
    window.removeEventListener('pointermove', onBodyMouseMove)
    window.removeEventListener('pointerup', onBodyMouseUp)
    root.removeEventListener('keydown', onGlobalKeyDown)
  }
}
