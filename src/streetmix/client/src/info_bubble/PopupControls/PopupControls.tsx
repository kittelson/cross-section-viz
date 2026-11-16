import { IntlProvider } from 'react-intl'

import { useSelector } from '@/streetmix/client/src/store/hooks.js'
import { VariantSet } from './VariantSet.js'
import { WidthControl } from './WidthControl.js'
import { BuildingHeightControl } from './BuildingHeightControl.js'
import './PopupControls.css'

import type { SectionElementTypeAndPosition } from '@/streetmix/packages/types/src'

export function PopupControls(props: SectionElementTypeAndPosition) {
  const { type, position } = props
  const { locale, segmentInfo } = useSelector((state) => state.locale)

  // Determine width or height control type
  let widthOrHeightControl
  switch (type) {
    case 'slice':
      widthOrHeightControl = <WidthControl position={position} />
      break
    case 'boundary':
      widthOrHeightControl = <BuildingHeightControl position={position} />
      break
    default:
      widthOrHeightControl = null
      break
  }

  return (
    <div className="popup-controls">
      <div className="popup-control-group">
        <IntlProvider locale={locale} messages={segmentInfo}>
          {/* @ts-expect-error TS2322 vendored streetmix, fix during cleanup */}
          <VariantSet type={type} position={position} />
        </IntlProvider>
        <div className="non-variant">
          {widthOrHeightControl}
        </div>
      </div>
    </div>
  )
}
