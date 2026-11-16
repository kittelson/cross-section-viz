/**
 * The Palette is the UI element at the bottom of the screen that shows all the
 * available street segments. Users can drag and drop segments from the palette
 * onto the street.
 */
import { IntlProvider } from 'react-intl'
import { getAllSegmentInfo } from '@/streetmix/packages/parts/src'

import { useSelector } from '../store/hooks.js'
import { Scrollable } from '../ui/Scrollable.js'
import { TooltipGroup } from '../ui/Tooltip.js'
import { PaletteItem } from './PaletteItem.js'
import './PaletteItems.css'

export function PaletteItems() {
  const locale = useSelector((state) => state.locale)

  const items = getAllSegmentInfo()

  return (
    <TooltipGroup>
      <Scrollable className="palette-items">
        <IntlProvider locale={locale.locale} messages={locale.segmentInfo}>
          <ul>
            {items.map((i) => (
              <PaletteItem key={i.id} item={i} />
            ))}
          </ul>
        </IntlProvider>
      </Scrollable>
    </TooltipGroup>
  )
}
