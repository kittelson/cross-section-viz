import type { ColorModes } from '@/streetmix/client/src/app/constants'
import type { UnitsSetting } from '@/streetmix/packages/types/src'

// TODO: Only use this for client-side types
// Shared types should move to @streetmix/types

export interface UserSettings {
  colorMode: ColorModes
  locale: string
  newStreetPreference: number // Deprecated
  saveAsImageSegmentNamesAndWidths: boolean
  saveAsImageStreetName: boolean
  saveAsImageTransparentSky: boolean
  units: UnitsSetting
}

export type ContentDirection = 'ltr' | 'rtl'

type ToastComponent =
  | 'TOAST_UNDO'

interface BaseToastItem {
  method?: 'success' | 'warning'
  title?: string
  action?: string
  duration?: number
  timestamp: number
}

// Toasts that specify component should not provide its own message
export interface ToastItemWithComponent extends BaseToastItem {
  component: ToastComponent
}

// Toasts that use a message should not specify a component name
export interface ToastItemWithMessage extends BaseToastItem {
  message: string
}

export type ToastItem = ToastItemWithComponent | ToastItemWithMessage

export interface DraggingState {
  isDragging: boolean
  segmentBeforeEl: number | null
  segmentAfterEl: number | null
  draggedSegment: number | null
  withinCanvas: boolean
}
