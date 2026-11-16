import type { ColorModes } from '@/streetmix/client/src/app/constants'
import type { SerializedError } from '@reduxjs/toolkit'
import type {
  GeolocationData,
  UnitsSetting,
} from '@/streetmix/packages/types/src'

// TODO: Only use this for client-side types
// Shared types should move to @streetmix/types

export interface UserSettings {
  colorMode: ColorModes
  lastStreetCreatorId: string
  lastStreetId: string
  lastStreetNamespacedId: number
  locale: string
  newStreetPreference: number // Deprecated
  saveAsImageSegmentNamesAndWidths: boolean
  saveAsImageStreetName: boolean
  saveAsImageTransparentSky: boolean
  units: UnitsSetting
}

export interface UserSettingsData {
  data: UserSettings
}

export interface UserProfile {
  id: string
  displayName: string
  profileImageUrl: string
  roles: string[]
  data: UserSettings
}

export interface UserSignInData {
  token: string
  refreshToken: string
  userId: string
  details: UserProfile | null // Set when available from server
}

export interface UserState {
  signInData: UserSignInData | null
  signedIn: boolean
  isSubscriber: boolean
  isCoilPluginSubscriber: boolean
  geolocation: {
    attempted: boolean
    data: GeolocationData | null
    error: string | SerializedError | null
  }
}

export type ContentDirection = 'ltr' | 'rtl'

type ToastComponent =
  | 'TOAST_UNDO'
  | 'TOAST_SIGN_IN'
  | 'TOAST_WEB_MONETIZATION'
  | 'TOAST_WEB_MONETIZATION_SUCCESS'
  | 'TOAST_NO_CONNECTION'

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
