import { memo } from 'react'
import { prettifyWidth } from '@/streetmix/packages/utils/src'

import type { UnitsSetting } from '@/streetmix/packages/types/src'

interface MeasurementTextProps {
  value: number
  units: UnitsSetting
  locale: string
}

function MeasurementText(props: MeasurementTextProps) {
  const { value, units, locale } = props

  return <span>{prettifyWidth(value, units, locale)}</span>
}

// This component is memoized because `prettifyWidth()` can be expensive
export default memo(MeasurementText)
