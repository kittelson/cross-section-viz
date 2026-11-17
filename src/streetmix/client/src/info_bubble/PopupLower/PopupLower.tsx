import { useSelector } from '@/streetmix/client/src/store/hooks.js'
import { Warnings } from './Warnings.js'

import type { BoundaryPosition, SliceItem } from '@/streetmix/packages/types/src'

interface PopupLowerProps {
  position: number | BoundaryPosition
}

export function PopupLower({ position }: PopupLowerProps) {
  const street = useSelector((state) => state.street)

  // Slice is undefined when position refers to a building
  let slice: SliceItem | undefined
  if (typeof position === 'number') {
    slice = street.segments[position]
  }

  return <Warnings slice={slice} />
}
