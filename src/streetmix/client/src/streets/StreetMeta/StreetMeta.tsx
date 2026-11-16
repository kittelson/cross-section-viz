import { StreetMetaWidth } from './StreetMetaWidth.js'
import { StreetMetaAuthor } from './StreetMetaAuthor.js'
import { StreetMetaDate } from './StreetMetaDate.js'
import { StreetMetaGeotag } from './StreetMetaGeotag.js'
import { StreetMetaAnalytics } from './StreetMetaAnalytics.js'
import './StreetMeta.css'

export function StreetMeta() {
  return (
    <div className="street-meta">
      <StreetMetaWidth />
      <StreetMetaAnalytics />
      <StreetMetaGeotag />
      <StreetMetaAuthor />
      <StreetMetaDate />
    </div>
  )
}
