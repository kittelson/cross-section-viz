import { addToast } from '@/streetmix/client/src/store/slices/toasts.js'
import store from '@/streetmix/client/src/store'

export function onNoConnection(): void {
  const state = store.getState()

  // Don't display this in offline mode
  if (state.system.offline) {
    return
  }

  store.dispatch(
    addToast({
      component: 'TOAST_NO_CONNECTION',
      method: 'warning',
      duration: Infinity,
    })
  )
}
