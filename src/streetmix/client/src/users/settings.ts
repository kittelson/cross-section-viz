import { debounce } from 'es-toolkit'

import type { UserSettings } from '@/streetmix/client/src/types/index.js'
import store, { observeStore, type RootState } from '../store'
import { updateSettings, type SettingsState } from '../store/slices/settings.js'

const LOCAL_STORAGE_SETTINGS_ID = 'settings'
const SAVE_SETTINGS_DELAY = 500

export function loadSettings() {
  // Skip this if localStorage is corrupted
  let settings: Partial<UserSettings> = {}
  try {
    const parsed = JSON.parse(
      // @ts-expect-error TS2345 vendored streetmix, fix during cleanup
      window.localStorage.getItem(LOCAL_STORAGE_SETTINGS_ID)
    )
    settings = parsed ?? {}
  } catch (err) {
    console.error(err)
  }

  // If `units` setting uses a legacy value, change it to `0`
  // @ts-expect-error `units` value of 2 is deprecated.
  if (settings.units === 2) {
    settings.units = 0
  }

  store.dispatch(updateSettings(settings))
}

/**
 * Save settings to LocalStorage. This should only be called after the settings
 * reducer has updated. This is meant to mirror application state that
 * should persist across browser sessions.
 */
function saveSettingsLocally(settings: UserSettings) {
  try {
    window.localStorage.setItem(
      LOCAL_STORAGE_SETTINGS_ID,
      JSON.stringify(settings)
    )
  } catch (err) {
    // Ignore localstorage write errors.
  }
}

/**
 * Use an observer model to set localstorage (a Redux pattern)
 *
 * Similar to:
 * https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
 * https://twitter.com/dan_abramov/status/703684128416333825
 *
 * Benefit: LocalStorage is always reflects the store, no matter how it's
 * updated. Debounced so updates are only made after rapid changes have
 * completed.
 */
export function initSettingsStoreObserver() {
  const select = (state: RootState) => state.settings
  const onChange = debounce(saveSettingsLocally, SAVE_SETTINGS_DELAY)

  // @ts-expect-error TS2345 vendored streetmix, fix during cleanup
  return observeStore<SettingsState>(select, onChange)
}
