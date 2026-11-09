import { FormattedMessage } from 'react-intl'

import { signOut } from '@/streetmix/client/src/users/authentication.js'
import { useDispatch } from '@/streetmix/client/src/store/hooks.js'
import { showDialog } from '@/streetmix/client/src/store/slices/dialogs.js'
import { Icon } from '@/streetmix/client/src/ui/Icon.js'
import Menu, { type MenuProps } from './Menu.js'
import { MenuItem } from './MenuItem.js'
import { MenuSeparator } from './MenuSeparator.js'
import './IdentityMenu.css'

export function IdentityMenu(props: MenuProps) {
  const dispatch = useDispatch()

  function handleSignOut() {
    signOut(false)
  }

  return (
    <Menu {...props} className="identity-menu">
      <MenuItem onClick={() => dispatch(showDialog('SETTINGS'))}>
        <Icon name="settings" className="menu-item-icon" />
        <FormattedMessage id="menu.item.settings" defaultMessage="Settings" />
      </MenuItem>
      <MenuSeparator />
      <MenuItem className="menu-item menu-sign-out" onClick={handleSignOut}>
        <Icon name="sign-out" className="menu-item-icon" />
        <FormattedMessage id="menu.item.sign-out" defaultMessage="Sign out" />
      </MenuItem>
    </Menu>
  )
}
