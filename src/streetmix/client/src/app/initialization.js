import { initSystemCapabilities } from '../preinit/system_capabilities'
import { initLocale } from '../locales/locale'
import { setLastStreet, setIgnoreStreetChanges } from '../streets/data_model'
import { initStreetDataChangedListener } from '../streets/street'
import { prepareStreet } from '../streets/templates'
import { initSkyboxChangedListener } from '../sky'
import { initDragTypeSubscriber } from '../segments/drag_and_drop'
import { updateSettingsFromCountryCode } from '../users/localization'
import { initSettingsStoreObserver, loadSettings } from '../users/settings'
import store, { observeStore } from '../store'
import { segmentsChanged } from '../store/actions/street'
import { everythingLoaded } from '../store/slices/app'
import { addEventListeners } from './event_listeners'
import { startListening } from './keypress'
import { registerKeypresses } from './keyboard_commands'
import { loadImages } from './load_resources'
import { setEditorRoot } from './editor_root'

// Classes the editor toggles on <body>; removed again on detach.
const BODY_CLASSES = [
  'windows',
  'safari',
  'read-only',
  'dark-skybox-invert-ui',
  'segment-move-dragging',
  'segment-resize-dragging',
]

let loading = null

/**
 * One-time setup: settings, sprites, locale, and the initial street.
 * Safe to call repeatedly; every call returns the same promise.
 */
export function loadOnce() {
  loading ??= load()
  return loading
}

async function load() {
  initSystemCapabilities()
  setIgnoreStreetChanges(true)

  let language = window.navigator.userLanguage || window.navigator.language
  if (language) {
    language = language.substring(0, 2).toUpperCase()
    updateSettingsFromCountryCode(language)
  }

  registerKeypresses()
  loadSettings()
  await Promise.all([loadImages(), initLocale()])
  prepareStreet()

  store.dispatch(segmentsChanged())
  setIgnoreStreetChanges(false)
  setLastStreet()
  store.dispatch(everythingLoaded())
}

/**
 * Connects the editor to the page while it is mounted in `root`: keyboard
 * and pointer listeners, store observers, and body classes. Returns a
 * function that undoes all of it.
 */
export function attach(root) {
  setEditorRoot(root)

  const cleanups = [
    startListening(root),
    addEventListeners(root),
    observeBodyClasses(),
    initStreetDataChangedListener(),
    initSettingsStoreObserver(),
    initSkyboxChangedListener(),
    initDragTypeSubscriber(),
  ]

  return function detach() {
    for (const cleanup of cleanups) cleanup()
    document.body.classList.remove(...BODY_CLASSES)
    setEditorRoot(null)
  }
}

function observeBodyClasses() {
  const select = (state) => ({ system: state.system, app: state.app })
  const onChange = (state) => {
    document.body.classList.toggle('windows', state.system.windows)
    document.body.classList.toggle('safari', state.system.safari)
    document.body.classList.toggle('read-only', state.app.readOnly)
  }

  onChange(select(store.getState()))
  return observeStore(select, onChange)
}
