import { useIntl } from 'react-intl'
import { useDrag } from 'react-dnd'

import { images } from '../app/load_resources.js'
import { Tooltip } from '../ui/Tooltip.js'
import { EmptyDragPreview } from '../ui/dnd/EmptyDragPreview.js'
import { createPaletteItemDragSpec } from '../segments/drag_and_drop.js'

import type { SegmentDefinition } from '@/streetmix/packages/types/src'
import './PaletteItem.css'

interface PaletteItemProps {
  item: SegmentDefinition
}

export function PaletteItem({ item }: PaletteItemProps) {
  const intl = useIntl()
  const [, drag, dragPreview] = useDrag(() => createPaletteItemDragSpec(item))

  // Get localized display names
  function getLabel(item: SegmentDefinition): string {
    const defaultMessage = item.name

    return intl.formatMessage({
      id: `segments.${item.nameKey}`,
      defaultMessage,
    })
  }

  const label = getLabel(item)

  const thumbnail =
    images.get(`thumbnails--${item.id}`)?.src ??
    images.get('thumbnails--missing')?.src

  return (
    // @ts-expect-error TS2322 vendored streetmix, fix during cleanup
    <li className="palette-item" ref={drag}>
      <Tooltip label={label}>
        <button>
          <img
            className="palette-item-image"
            src={thumbnail}
            draggable={false}
            alt={label}
          />
        </button>
      </Tooltip>
      <EmptyDragPreview dragPreview={dragPreview} />
    </li>
  )
}
