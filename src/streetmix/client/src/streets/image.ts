import { getBoundaryImageHeight } from '../boundary'
import { TILE_SIZE, BOUNDARY_WIDTH } from '../segments/constants.js'
import { drawStreetThumbnail } from './thumbnail.js'

import type { StreetState } from '@/streetmix/packages/types/src'

// This can be adjusted to create much more hi-definition images
const SAVE_AS_IMAGE_DPI = 2.0

const SAVE_AS_IMAGE_MIN_HEIGHT = 400
const SAVE_AS_IMAGE_MIN_HEIGHT_WITH_STREET_NAME = SAVE_AS_IMAGE_MIN_HEIGHT + 150
const SAVE_AS_IMAGE_BOTTOM_PADDING = 60

// Used in thumbnail
// TODO: a way to remove the circular dependency?!
export const SAVE_AS_IMAGE_LABEL_PADDING = 65

export async function getStreetImage(
  street: StreetState,
  transparentSky: boolean,
  labels: boolean,
  streetName: boolean,
  dpi = SAVE_AS_IMAGE_DPI,
  locale: string | null = null
): Promise<HTMLCanvasElement> {
  const width = TILE_SIZE * street.width + BOUNDARY_WIDTH * 2

  const leftHeight = getBoundaryImageHeight(
    street.boundary.left.variant,
    'left',
    street.boundary.left.floors
  )
  const rightHeight = getBoundaryImageHeight(
    street.boundary.right.variant,
    'right',
    street.boundary.right.floors
  )

  let height = Math.max(leftHeight, rightHeight)

  if (height < SAVE_AS_IMAGE_MIN_HEIGHT) {
    height = SAVE_AS_IMAGE_MIN_HEIGHT
  }

  if (streetName && height < SAVE_AS_IMAGE_MIN_HEIGHT_WITH_STREET_NAME) {
    height = SAVE_AS_IMAGE_MIN_HEIGHT_WITH_STREET_NAME
  }

  height += SAVE_AS_IMAGE_BOTTOM_PADDING

  if (labels) {
    height += SAVE_AS_IMAGE_LABEL_PADDING
  }

  const el = document.createElement('canvas')
  el.width = width * dpi
  el.height = height * dpi

  const ctx = el.getContext('2d')

  if (!ctx) {
    throw new Error('Unable to create canvas rendering context')
  }

  await drawStreetThumbnail(ctx, street, {
    width,
    height,
    dpi,
    multiplier: 1.0,
    silhouette: false,
    transparentSky,
    labels,
    streetName,
    locale,
  })

  return el
}
