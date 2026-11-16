import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Icon } from '@/streetmix/client/src/ui/Icon.js'
import { Dialog } from '../Dialog.js'
import { GeneralSettings } from './GeneralSettings.js'
import { LanguageSettings } from './LanguageSettings.js'
import { ProfileSettings } from './ProfileSettings.js'
import { UnitSettings } from './UnitSettings.js'
import './SettingsDialog.css'

interface SettingsDialogProps {
  category: string
}

/**
 * Settings shown/modified in this dialog should apply at user-level.
 * Users that are not signed in (anonymous) are applied for the browser
 * session. Don't use this for street-level settings.
 */
export function SettingsDialog({ category = 'profile' }: SettingsDialogProps) {
  const [activeCategory, setActiveCategory] = useState(category)

  function handleSelectCategory(category: string): void {
    setActiveCategory(category)
  }

  let SettingsPanel
  switch (activeCategory) {
    case 'general':
      SettingsPanel = <GeneralSettings />
      break
    case 'language':
      SettingsPanel = <LanguageSettings />
      break
    case 'profile':
      SettingsPanel = <ProfileSettings />
      break
    case 'units':
      SettingsPanel = <UnitSettings />
      break
    default:
      /* eslint-disable-next-line formatjs/no-literal-string-in-jsx */
      SettingsPanel = <div>Not implemented</div>
  }

  return (
    <Dialog>
      {(closeDialog) => (
        <div className="settings-dialog">
          <header>
            <h1>
              <FormattedMessage
                id="settings.heading"
                defaultMessage="Settings"
              />
            </h1>
          </header>
          <div className="dialog-content dialog-content-bleed">
            <div className="settings-dialog-content">
              <div className="settings-dialog-left">
                <ul>
                  <li
                    onClick={() => {
                      handleSelectCategory('profile')
                    }}
                    className={
                      activeCategory === 'profile' ? 'settings-menu-active' : ''
                    }
                  >
                    <Icon
                      name="user"
                      size="18"
                      className="settings-menu-icon"
                    />
                    <FormattedMessage
                      id="settings.profile.label"
                      defaultMessage="Profile"
                    />
                  </li>

                  <li
                    onClick={() => {
                      handleSelectCategory('general')
                    }}
                    className={
                      activeCategory === 'general' ? 'settings-menu-active' : ''
                    }
                  >
                    <Icon
                      name="settings"
                      size="18"
                      className="settings-menu-icon"
                    />
                    <FormattedMessage
                      id="settings.general.label"
                      defaultMessage="General"
                    />
                  </li>
                  <li
                    onClick={() => {
                      handleSelectCategory('language')
                    }}
                    className={
                      activeCategory === 'language'
                        ? 'settings-menu-active'
                        : ''
                    }
                  >
                    <Icon
                      name="language"
                      size="18"
                      className="settings-menu-icon"
                    />
                    <FormattedMessage
                      id="settings.language.label"
                      defaultMessage="Language"
                    />
                  </li>
                </ul>
              </div>
              <div className="settings-dialog-right">{SettingsPanel}</div>
            </div>
          </div>
          <button className="dialog-primary-action" onClick={closeDialog}>
            <FormattedMessage id="btn.close" defaultMessage="Close" />
          </button>
        </div>
      )}
    </Dialog>
  )
}
