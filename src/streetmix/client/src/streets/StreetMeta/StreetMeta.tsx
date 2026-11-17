import { StreetMetaWidth } from './StreetMetaWidth.js'
import { StreetMetaAnalytics } from './StreetMetaAnalytics.js'
import './StreetMeta.css'

export function StreetMeta() {
  return (
    <div className="street-meta">
      <StreetMetaWidth />
      <StreetMetaAnalytics />
    </div>
  )
}
