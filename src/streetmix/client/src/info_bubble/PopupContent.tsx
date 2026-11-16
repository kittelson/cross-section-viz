import { useDispatch } from '@/streetmix/client/src/store/hooks.js'
import { loseAnyFocus } from '@/streetmix/client/src/util/focus.js'
import { TooltipGroup } from '@/streetmix/client/src/ui/Tooltip.js'
import { setInfoBubbleMouseInside } from '../store/slices/infoBubble.js'
import { PopupControls } from './PopupControls'
import { PopupHeader } from './PopupHeader'
import { PopupLower } from './PopupLower'

import type { SectionElementTypeAndPosition } from '@/streetmix/packages/types/src'

// `...props` is a discriminated union of `SectionElementTypeAndPosition`,
// do not destructure it or it will lose type safety!
export function PopupContent(props: SectionElementTypeAndPosition) {
  const dispatch = useDispatch()

  const classNames = ['popup-content']

  if (props.type === 'boundary') {
    classNames.push('popup-at-boundary')
  }

  function handleMouseEnter() {
    dispatch(setInfoBubbleMouseInside(true))
  }

  function handleMouseLeave() {
    dispatch(setInfoBubbleMouseInside(false))

    // Returns focus to body when pointer leaves the info bubble area
    // so that keyboard commands respond to pointer position rather than
    // any focused buttons/inputs
    // TODO: do we still need this? (ported from legacy infobubble)
    loseAnyFocus()
  }

  return (
    <div
      className={classNames.join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TooltipGroup>
        <PopupHeader {...props} />
        <PopupControls {...props} />
        <PopupLower {...props} />
      </TooltipGroup>
    </div>
  )
}
