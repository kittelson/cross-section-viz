import { FormattedMessage } from 'react-intl'

import { useDispatch } from '@/streetmix/client/src/store/hooks.js'
import { startPrinting } from '@/streetmix/client/src/store/slices/app.js'
import { Icon } from '@/streetmix/client/src/ui/Icon.js'
import { MenuItem } from '../MenuItem.js'

export function PrintImage() {
  const dispatch = useDispatch()

  function handleClickPrint(event: React.MouseEvent): void {
    event.preventDefault()

    // Manually dispatch printing state here. Workaround for Chrome bug where
    // calling window.print() programatically (even with a timeout) render a
    // blank image instead
    dispatch(startPrinting())

    window.setTimeout(function () {
      window.print()
    }, 0)
  }

  return (
    <MenuItem onClick={handleClickPrint}>
      <Icon name="print" className="menu-item-icon" />
      <FormattedMessage id="menu.share.print" defaultMessage="Print…" />
    </MenuItem>
  )
}
