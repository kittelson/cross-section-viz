import { initSystemCapabilities } from '../preinit/system_capabilities'
import { initLocale } from '../locales/locale'
import { setLastStreet, setIgnoreStreetChanges } from '../streets/data_model'
import { initStreetNameChangeListener } from '../streets/name'
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

function preInit() {
  initSystemCapabilities()
  setIgnoreStreetChanges(true)

  let language = window.navigator.userLanguage || window.navigator.language
  if (language) {
    language = language.substring(0, 2).toUpperCase()
    updateSettingsFromCountryCode(language)
  }

  registerKeypresses()

  // Start listening for keypresses
  startListening()

  observeStoreToUpdateBodyClasses()
}

export async function initialize() {
  preInit()

  window.dispatchEvent(new window.CustomEvent('stmx:init'))

  loadSettings()
  await Promise.all([loadImages(), initLocale()])
  prepareStreet()

  onEverythingLoaded()
}

function onEverythingLoaded() {
  store.dispatch(segmentsChanged())

  setIgnoreStreetChanges(false)
  setLastStreet()
  initStreetDataChangedListener()
  initSettingsStoreObserver()

  initStreetNameChangeListener()
  initSkyboxChangedListener()
  initDragTypeSubscriber()

  addEventListeners()

  store.dispatch(everythingLoaded())
}

/**
 * Toggle features based on system state. (This allows toggling to debug things,
 * which will allow us to remove the debug URL parameters as a future TODO)
 */
function observeStoreToUpdateBodyClasses() {
  const select = (state) => ({ system: state.system, app: state.app })
  const onChange = (state) => {
    document.body.classList.toggle('windows', state.system.windows)
    document.body.classList.toggle('safari', state.system.safari)
    document.body.classList.toggle('read-only', state.app.readOnly)
  }

  return observeStore(select, onChange)
}
