import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface DebugState {
  forceLeftHandTraffic: boolean
  forceNonRetina: boolean
  forceReadOnly: boolean
}

const initialState: DebugState = {
  forceLeftHandTraffic: false,
  forceNonRetina: false,
  forceReadOnly: false
}

const debugSlice = createSlice({
  name: 'debug',
  initialState,

  reducers: {
    setDebugFlags (state, action: PayloadAction<DebugState>) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { setDebugFlags } = debugSlice.actions

export default debugSlice.reducer
