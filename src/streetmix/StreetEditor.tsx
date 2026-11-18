import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import '@fontsource-variable/manrope'
import '@fontsource-variable/overpass'
import '@fontsource-variable/rubik'
import '@fontsource-variable/rubik/wght-italic.css'
import '@/streetmix/client/styles/styles.css'

import store from '@/streetmix/client/src/store'
import { setAppFlags } from '@/streetmix/client/src/store/slices/app'
import { attach, loadOnce } from '@/streetmix/client/src/app/initialization.js'
import { EmbeddedApp } from '@/streetmix/client/src/app/EmbeddedApp.js'

interface StreetEditorProps {
  readOnly?: boolean
}

/**
 * Only one StreetEditor may be mounted at a time: Streetmix keeps a single
 * global store and editor root.
 */
export function StreetEditor({ readOnly = false }: StreetEditorProps) {
  const [root, setRoot] = useState<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [attached, setAttached] = useState(false)

  useEffect(() => {
    let cancelled = false
    void loadOnce().then(() => {
      if (!cancelled) setLoaded(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!root) return
    const detach = attach(root)
    store.dispatch(setAppFlags({ readOnly }))
    setAttached(true)
    return () => {
      setAttached(false)
      store.dispatch(setAppFlags({ readOnly: false }))
      detach()
    }
  }, [root, readOnly])

  // Streetmix expects keyboard focus on the editor while the pointer is over
  // it, so hover-and-type works. Only take focus nobody else holds.
  function handlePointerEnter() {
    if (root && document.activeElement === document.body) {
      root.focus({ preventScroll: true })
    }
  }

  return (
    <div
      ref={setRoot}
      tabIndex={0}
      role="application"
      aria-label={readOnly ? 'Street cross section' : 'Street editor'}
      onPointerEnter={handlePointerEnter}
      className="streetmix-root relative isolate h-full w-full overflow-hidden rounded-lg border focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <Provider store={store}>
        {loaded && attached && <EmbeddedApp />}
      </Provider>
    </div>
  )
}
