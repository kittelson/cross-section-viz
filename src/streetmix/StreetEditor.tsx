import { useEffect } from 'react'
import { Provider } from 'react-redux'

import '@fontsource-variable/manrope'
import '@fontsource-variable/overpass'
import '@fontsource-variable/rubik'
import '@fontsource-variable/rubik/wght-italic.css'
import 'leaflet/dist/leaflet.css'
import '@/streetmix/client/styles/styles.css'

import store from '@/streetmix/client/src/store'
import { initialize } from '@/streetmix/client/src/app/initialization.js'
import { App } from '@/streetmix/client/src/app/App.js'

// initialize() registers global listeners and must run only once per page
// load; this also absorbs StrictMode's double-invoked effects in development.
let initialized = false

export function StreetEditor() {
  useEffect(() => {
    if (initialized) return
    initialized = true
    initialize()
  }, [])

  return (
    <div className="streetmix-root">
      <div id="svg" hidden />
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  )
}
