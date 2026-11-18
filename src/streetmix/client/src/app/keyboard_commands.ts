import { DRAGGING_TYPE_RESIZE } from '../segments/constants.js'
import { handleSegmentResizeCancel } from '../segments/resizing.js'
import { formatMessage } from '../locales/locale.js'
import { addToast } from '../store/slices/toasts.js'
import { handleUndo, handleRedo } from '../store/actions/history.js'
import store from '../store'
import { registerKeypress } from './keypress.js'

export function onGlobalKeyDown(event: KeyboardEvent): void {
  switch (event.key) {
    case 'Esc': // IE/Edge specific value
    case 'Escape': {
      const { draggingType } = store.getState().ui

      if (draggingType === DRAGGING_TYPE_RESIZE) {
        handleSegmentResizeCancel()
      } else {
        return
      }

      event.preventDefault()
      break
    }
  }
}

export function registerKeypresses(): void {
  // In case anyone tries a save shortcut key out of reflex,
  // we inform the user that it's not necessary.
  registerKeypress('ctrl s', function () {
    store.dispatch(
      addToast({
        message: formatMessage(
          'toast.no-save',
          'No need to save by hand; Streetmix automatically saves your street!'
        ),
      })
    )
  })

  // Catch-all for the Ctrl-S shortcut from ever trying to
  // save the page contents
  registerKeypress(
    'ctrl s',
    {
      preventDefault: true,
      requireFocusOnEditor: false,
    },
    () => {} // noop
  )

  // Catch-all for the backspace or delete buttons to prevent
  // browsers from going back in history
  registerKeypress(
    ['backspace', 'delete'],
    {
      preventDefault: true,
      requireFocusOnEditor: true,
    },
    () => {} // noop
  )

  // Undo
  registerKeypress(
    'ctrl z',
    {
      preventDefault: true,
      requireFocusOnEditor: true,
      shiftKey: false,
    },
    () => {
      store.dispatch(handleUndo())
    }
  )

  // Redo
  registerKeypress(
    ['shift ctrl z', 'ctrl y'],
    {
      preventDefault: true,
      requireFocusOnEditor: true,
    },
    () => {
      store.dispatch(handleRedo())
    }
  )
}
