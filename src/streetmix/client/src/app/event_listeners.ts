import { onBodyMouseMove, onBodyMouseUp } from '../segments/drag_and_drop.js'
import { onGlobalKeyDown } from './keyboard_commands.js'

export function addEventListeners(): void {
  // TODO: these global event listeners only handle resize dragging.
  // We should encapsulate this functionality into the resize component and
  // remove the global listeners.
  window.addEventListener('pointermove', onBodyMouseMove)
  window.addEventListener('pointerup', onBodyMouseUp)
  window.addEventListener('keydown', onGlobalKeyDown)
}
