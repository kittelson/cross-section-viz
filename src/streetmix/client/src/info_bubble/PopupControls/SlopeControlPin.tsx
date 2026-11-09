import { getSlopeValues } from '@/streetmix/client/src/segments/slope.js'
import { useDispatch, useSelector } from '@/streetmix/client/src/store/hooks.js'
import { segmentsChanged } from '@/streetmix/client/src/store/actions/street.js'
import { setSlopeValue } from '@/streetmix/client/src/store/slices/street.js'
import { Button } from '@/streetmix/client/src/ui/Button.js'
import { Icon } from '@/streetmix/client/src/ui/Icon.js'

interface SlopeControlPinProps {
  position: number
  anchor: number
}

export function SlopeControlPin({ position, anchor }: SlopeControlPinProps) {
  const street = useSelector((state) => state.street)
  const dispatch = useDispatch()

  function onClick() {
    const values = getSlopeValues(street, position)

    dispatch(setSlopeValue(position, anchor, values[anchor]))
    dispatch(segmentsChanged())
  }

  return (
    <Button onClick={onClick} style={{ marginLeft: '0.25em' }}>
      <Icon name="pin" size="24" stroke="1.5" className="tabler-icon" />
    </Button>
  )
}
