import { FormattedMessage } from 'react-intl'

import { useSelector } from '@/streetmix/client/src/store/hooks.js'
import { URL_NEW_STREET, STREET_TEMPLATES } from '@/streetmix/client/src/app/constants.js'
import { BetaTag } from '@/streetmix/client/src/ui/BetaTag.js'
import { Icon } from '@/streetmix/client/src/ui/Icon.js'
import Menu, { type MenuProps } from './Menu.js'
import { MenuItem } from './MenuItem.js'
import { MenuSeparator } from './MenuSeparator.js'
import { SignInPromo } from './ShareMenu/SignInPromo.js'

function openTemplate(template: string, tour: boolean = false): void {
  const url =
    `${URL_NEW_STREET}?type=${template}` + (tour ? `&tour=${true}` : '')
  window.open(url, '_blank')
}

export function NewStreetMenu(props: MenuProps) {
  const user = useSelector((state) => state.user)

  return (
    <Menu {...props}>
      <MenuItem
        onClick={() => {
          openTemplate(STREET_TEMPLATES.DEFAULT)
        }}
      >
        <Icon name="new-street" className="menu-item-icon" />
        <FormattedMessage
          id="menu.new-street.default"
          defaultMessage="New example street"
        />
        <Icon name="external-link" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          openTemplate(STREET_TEMPLATES.EMPTY)
        }}
      >
        <FormattedMessage
          id="menu.new-street.empty"
          defaultMessage="New empty street"
        />
        <Icon name="external-link" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          openTemplate(STREET_TEMPLATES.COPY)
        }}
      >
        <Icon name="copy" className="menu-item-icon" />
        <FormattedMessage
          id="menu.new-street.copy"
          defaultMessage="Make a copy"
        />
        <Icon name="external-link" />
      </MenuItem>
      {/* <MenuSeparator />
      <MenuItem>
        <Icon name="template" className="menu-item-icon" />
        <FormattedMessage
          id="menu.new-street.template"
          defaultMessage="New from template…"
        />
        <BetaTag />
      </MenuItem> */}
      <>
        <MenuSeparator />
        <div className="dropdown-menu-label" role="presentation">
          <FormattedMessage
            id="menu.new-street.templates-label"
            defaultMessage="Street templates"
          />
          <BetaTag />
        </div>
        <MenuItem
          disabled={!user.signedIn}
          onClick={() => {
            openTemplate(STREET_TEMPLATES.STROAD)
          }}
        >
          <FormattedMessage
            id="menu.new-street.templates.stroad"
            defaultMessage="Stroad"
          />
          <Icon name="external-link" />
        </MenuItem>
        {!user.signedIn && <SignInPromo type="template" />}
      </>
    </Menu>
  )
}
