import { getWidthInMetric } from '@/streetmix/packages/utils/src'

import type { MeasurementValues, UnitsSetting } from '@/streetmix/packages/types/src'

export function getElevationValue(
  elevation: number | MeasurementValues | undefined,
  units: UnitsSetting
): number {
  if (typeof elevation === 'number') {
    return elevation
  } else if (typeof elevation !== 'undefined') {
    return getWidthInMetric(elevation, units)
  } else {
    return 0
  }
}
