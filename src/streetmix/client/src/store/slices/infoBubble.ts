import { createSlice } from '@reduxjs/toolkit'

import { startPrinting } from './app.js'

interface InfoBubbleState {
  mouseInside: boolean
}

const initialState: InfoBubbleState = {
  mouseInside: false,
}

const infoBubbleSlice = createSlice({
  name: 'infoBubble',
  initialState,

  reducers: {
    setInfoBubbleMouseInside(state, action) {
      state.mouseInside = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(startPrinting, (state) => {
      state.mouseInside = false
    })
  },
})

export const { setInfoBubbleMouseInside } = infoBubbleSlice.actions

export default infoBubbleSlice.reducer
