import { IntlProvider } from 'react-intl'
// @ts-expect-error TS2724 vendored streetmix, fix during cleanup
import { DirectionProvider, type Direction } from '@radix-ui/react-direction'
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { FloatingTree } from '@floating-ui/react'

import { PaletteContainer } from '../palette/PaletteContainer.js'
import { DialogRoot } from '../dialogs/DialogRoot.js'
import { SegmentDragLayer } from '../segments/SegmentDragLayer.js'
import { ToastContainer } from '../ui/Toasts'
import { useSelector } from '../store/hooks.js'
import { StreetView } from './StreetView.js'
import { MainScreen } from './MainScreen.js'

/**
 * Streetmix's editor without its standalone-site chrome (menu bar, street
 * nameplate, welcome panel, sky picker, debug and print views). Render only
 * after `loadOnce()` has resolved and `attach()` has run.
 */
export function EmbeddedApp() {
  const locale = useSelector((state) => state.locale)
  const dir: Direction = useSelector(
    (state) => state.app.contentDirection as Direction
  ) // TODO use real type

  return (
    <FloatingTree>
      <DirectionProvider dir={dir}>
        <IntlProvider
          locale={locale.locale}
          key={locale.locale}
          messages={locale.messages}
        >
          {/* The prop context={window} prevents crash errors with hot-module reloading */}
          <DndProvider options={HTML5toTouch} context={window}>
            {/* DndProvider allows multiple children; IntlProvider does not */}
            <DialogRoot />
            <MainScreen>
              <PaletteContainer />
              <SegmentDragLayer />
              <StreetView />
              <ToastContainer />
            </MainScreen>
          </DndProvider>
        </IntlProvider>
      </DirectionProvider>
    </FloatingTree>
  )
}
