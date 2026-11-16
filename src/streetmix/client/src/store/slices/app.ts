import { createSlice } from '@reduxjs/toolkit'
import type { ContentDirection } from '@/streetmix/client/src/types'

import { changeLocale } from './locale.js'

import type { PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  readOnly: boolean
  printing: boolean
  everythingLoaded: boolean
  contentDirection: ContentDirection
}

const initialState: AppState = {
  readOnly: false,
  printing: false,
  everythingLoaded: false,
  contentDirection: 'ltr',
}

const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setAppFlags(state, action: PayloadAction<Partial<AppState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },

    startPrinting(state) {
      state.printing = true
    },

    stopPrinting(state) {
      state.printing = false
    },

    everythingLoaded(state) {
      state.everythingLoaded = true
    },
  },

  extraReducers: (builder) => {
    builder.addCase(changeLocale.fulfilled, (state, action) => {
      const direction = ['ar', 'dv', 'fa', 'he'].includes(action.payload.locale)
        ? 'rtl'
        : 'ltr'
      state.contentDirection = direction
    })
  },
})

export const { setAppFlags, startPrinting, stopPrinting, everythingLoaded } =
  appSlice.actions

export default appSlice.reducer
