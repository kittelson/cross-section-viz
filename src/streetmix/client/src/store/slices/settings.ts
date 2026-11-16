import { createSlice } from '@reduxjs/toolkit'

import { COLOR_MODE_LIGHT, type ColorModes } from '@/streetmix/client/src/app/constants.js'
import { SETTINGS_UNITS_METRIC } from '@/streetmix/client/src/users/constants.js'
import { changeLocale } from './locale.js'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { UnitsSetting } from '@/streetmix/packages/types/src'

export interface SettingsState {
  lastStreetId: string | null
  lastStreetNamespacedId: number | null
  lastStreetCreatorId: string | null
  newStreetPreference: number // Deprecated
  saveAsImageTransparentSky: boolean
  saveAsImageSegmentNamesAndWidths: boolean
  saveAsImageStreetName: boolean
  colorMode: ColorModes
  locale: string | null
  units: UnitsSetting
}

const initialState: SettingsState = {
  lastStreetId: null,
  lastStreetNamespacedId: null,
  lastStreetCreatorId: null,
  newStreetPreference: 1,
  saveAsImageTransparentSky: false,
  saveAsImageSegmentNamesAndWidths: false,
  saveAsImageStreetName: false,
  colorMode: COLOR_MODE_LIGHT,
  locale: null,
  units: SETTINGS_UNITS_METRIC,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    updateSettings(state, action: PayloadAction<Partial<SettingsState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },

    setUserUnits(state, action: PayloadAction<SettingsState['units']>) {
      const units = action.payload
      state.units = units
    },

    setUserColorMode(state, action: PayloadAction<ColorModes>) {
      const mode = action.payload
      state.colorMode = mode
    },
  },

  extraReducers: (builder) => {
    builder.addCase(changeLocale.fulfilled, (state, action) => {
      state.locale = action.payload.locale
    })
  },
})

export const { updateSettings, setUserUnits, setUserColorMode } =
  settingsSlice.actions

export default settingsSlice.reducer
