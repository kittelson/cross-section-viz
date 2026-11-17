import { FormattedMessage } from 'react-intl'

import { UnitSettings } from './UnitSettings.js'

export function GeneralSettings() {
  return (
    <>
      <section>
        <h2>
          <FormattedMessage
            id="settings.general.label"
            defaultMessage="General"
          />
        </h2>
        <hr />
      </section>

      <UnitSettings />
    </>
  )
}
