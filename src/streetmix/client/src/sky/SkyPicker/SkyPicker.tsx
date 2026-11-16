import { FormattedMessage } from 'react-intl'

import { useSelector, useDispatch } from '@/streetmix/client/src/store/hooks.js'
import { toggleToolbox } from '@/streetmix/client/src/store/slices/ui.js'
import { FloatingPanel } from '@/streetmix/client/src/ui/FloatingPanels'
import { TooltipGroup } from '@/streetmix/client/src/ui/Tooltip.js'
import { SkyOptions } from './SkyOptions.js'
import './SkyPicker.css'

export function SkyPicker() {
  const show = useSelector((state) => state.ui.toolboxVisible ?? false)
  const dispatch = useDispatch()

  function handleClose(): void {
    dispatch(toggleToolbox())
  }

  return (
    <FloatingPanel
      icon="sun"
      title={
        <FormattedMessage
          id="tools.skybox.heading"
          defaultMessage="Environment"
        />
      }
      show={show}
      className="sky-picker"
      handleClose={handleClose}
    >
      <TooltipGroup>
        <SkyOptions />
      </TooltipGroup>
    </FloatingPanel>
  )
}
