import { formatMessage } from '@/streetmix/client/src/locales/locale.js'
import {
  RESIZE_TYPE_INCREMENT,
  RESIZE_TYPE_PRECISE_DRAGGING,
  resolutionForResizeType,
  normalizeSegmentWidth,
  cancelSegmentResizeTransitions,
} from '@/streetmix/client/src/segments/resizing.js'
import { getSlopeValues } from '@/streetmix/client/src/segments/slope.js'
import { recordStreetChanges } from '@/streetmix/client/src/streets/data_model.js'
import { applyWarningsToSlices } from '@/streetmix/client/src/streets/warnings.js'
import { recalculateWidth } from '@/streetmix/client/src/streets/width.js'
import { addToast } from '../slices/toasts.js'
import {
  updateStreetWidth,
  updateSegments,
  removeSegment,
  clearSegments,
  changeSegmentWidth,
  updateStreetData,
  updateShowAnalytics,
  updateCapacitySource,
} from '../slices/street.js'
import { setInfoBubbleMouseInside } from '../slices/infoBubble.js'
import { setActiveSegment, setImmediateRemoval } from '../slices/ui.js'
import { setSliceWarnings } from '../slices/warnings.js'

import type { Dispatch, RootState } from '../index.js'
import type { SliceItem, StreetState } from '@/streetmix/packages/types/src'

/**
 * `updateStreetWidth` as a thunk action that automatically
 * dispatches segmentChanged
 */
export function updateStreetWidthAction(width: number) {
  return async (dispatch: Dispatch) => {
    await dispatch(updateStreetWidth(width))
    await dispatch(segmentsChanged())
  }
}

/**
 * `updateStreetData` as a thunk action that also makes sure that
 * `immediateRemoval` is true
 */
export function updateStreetDataAction(data: Partial<StreetState>) {
  return async (dispatch: Dispatch) => {
    await dispatch(setImmediateRemoval(true))
    await dispatch(updateStreetData(data))
  }
}

export const segmentsChanged = (force = false) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { street } = getState()

    const calculatedWidths = recalculateWidth(street)

    // Original slices state is read-only, so we need to clone it to modify
    // and update its properties.
    const clonedSlices: SliceItem[] = street.segments.map((slice, index) => {
      // Calculate slope values, if needed
      let slopeValues: number[]
      if (slice.slope.on && slice.slope.values.length === 0) {
        // If we don't have slope values, create it using adjacent values
        slopeValues = getSlopeValues(street, index)
      } else {
        // Else, reuse previous values
        slopeValues = slice.slope.values
      }

      return {
        // This shallow-copies the original data, which is generally fine
        // for everything but two properties
        ...slice,
        // This will be modified by slope calculation
        slope: {
          on: slice.slope.on ?? false,
          values: slopeValues,
        },
      }
    })
    await dispatch(
      updateSegments(
        clonedSlices,
        calculatedWidths.occupiedWidth.toNumber(),
        calculatedWidths.remainingWidth.toNumber()
      )
    )

    const sliceWarnings = applyWarningsToSlices(
      clonedSlices,
      street,
      calculatedWidths
    )
    await dispatch(setSliceWarnings(sliceWarnings))

    recordStreetChanges(force)
  }
}

export const removeSegmentAction = (segmentIndex: number) => {
  return async (dispatch: Dispatch) => {
    await dispatch(setImmediateRemoval(false))
    await dispatch(removeSegment(segmentIndex))
    await dispatch(segmentsChanged())

    // Reset various UI states
    await dispatch(setActiveSegment(null))
    await dispatch(setInfoBubbleMouseInside(false))

    await dispatch(
      addToast({
        message: formatMessage(
          'toast.segment-deleted',
          'The segment has been removed.'
        ),
        component: 'TOAST_UNDO',
      })
    )
  }
}

export const clearSegmentsAction = () => {
  return async (dispatch: Dispatch) => {
    await dispatch(setImmediateRemoval(true))
    await dispatch(clearSegments())
    await dispatch(segmentsChanged())

    // Reset various UI states
    await dispatch(setActiveSegment(null))
    await dispatch(setInfoBubbleMouseInside(false))

    await dispatch(
      addToast({
        message: formatMessage(
          'toast.all-segments-deleted',
          'All segments have been removed.'
        ),
        component: 'TOAST_UNDO',
      })
    )
  }
}

export const setShowAnalytics = (isVisible: boolean) => {
  return async (dispatch: Dispatch) => {
    await dispatch(updateShowAnalytics(isVisible))
    await dispatch(segmentsChanged())
  }
}

export const setCapacitySource = (source: string) => {
  return async (dispatch: Dispatch) => {
    await dispatch(updateCapacitySource(source))
    await dispatch(segmentsChanged())
  }
}

export const incrementSegmentWidth = (
  sliceIndex: number,
  add: boolean,
  precise: boolean,
  resizeType: number = RESIZE_TYPE_INCREMENT
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const units = getState().street.units
    const origWidth = getState().street.segments[sliceIndex].width

    let resolution

    if (precise) {
      resolution = resolutionForResizeType(RESIZE_TYPE_PRECISE_DRAGGING, units)
    } else {
      resolution = resolutionForResizeType(resizeType, units)
    }

    let increment = resolution

    if (!add) {
      increment = -increment
    }

    // When width values are imprecise (e.g. after unit conversion), then
    // increment to nearest precise value, rather than increment first and
    // then make precise
    const adjustedWidth = normalizeSegmentWidth(origWidth, resolution)

    let width
    if (origWidth !== adjustedWidth) {
      if (add && adjustedWidth > origWidth) {
        width = adjustedWidth
      } else if (!add && adjustedWidth < origWidth) {
        width = adjustedWidth
      } else {
        width = normalizeSegmentWidth(origWidth + increment, resolution)
      }
    } else {
      width = normalizeSegmentWidth(origWidth + increment, resolution)
    }

    cancelSegmentResizeTransitions()
    await dispatch(changeSegmentWidth(sliceIndex, width))
    await dispatch(segmentsChanged())
  }
}
