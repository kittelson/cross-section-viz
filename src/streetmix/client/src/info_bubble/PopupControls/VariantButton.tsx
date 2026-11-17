import { useIntl } from 'react-intl'

import VARIANT_ICONS from '@/streetmix/client/src/segments/variant_icons.yaml'
import { Button } from '@/streetmix/client/src/ui/Button.js'
import { Icon, type IconNames } from '@/streetmix/client/src/ui/Icon.js'
import { Tooltip } from '@/streetmix/client/src/ui/Tooltip.js'

interface VariantButtonProps {
  set: string
  selection: string
  isSelected: boolean
  onClick: React.MouseEventHandler
}

type VariantIconDefinition = (
  | {
      id: string
      iconSet?: never
    }
  | {
      // Icons can also be defined from tabler
      id: IconNames
      iconSet: 'tabler'
    }
) & {
  title: string
  color?: string // CSS colors
}

type VariantIcons = Record<string, Record<string, VariantIconDefinition>>

export function VariantButton(props: VariantButtonProps) {
  const { set, selection, isSelected, onClick } = props
  const intl = useIntl()

  const icon = (VARIANT_ICONS as VariantIcons)[set][selection]

  if (icon === undefined) return null

  const label = intl.formatMessage({
    id: `variant-icons.${set}|${selection}`,
    defaultMessage: icon.title,
  })

  return (
    <Tooltip label={label} placement="bottom" role="label">
      <Button
        className={isSelected ? 'variant-selected' : undefined}
        aria-label={label}
        onClick={onClick}
      >
        {icon.iconSet === 'tabler' ? (
          <Icon name={icon.id} size="30" stroke="1.5" className="tabler-icon" />
        ) : (
          <svg
            xmlns="http://www.w3.org/1999/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="icon"
            style={icon.color !== undefined ? { fill: icon.color } : undefined}
          >
            <use href={`#icon-${icon.id}`} />
          </svg>
        )}
      </Button>
    </Tooltip>
  )
}
