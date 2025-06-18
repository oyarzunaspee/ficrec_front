import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HighlightState {
  value: string
}

const initialState = {
  value: "default"
} satisfies HighlightState as HighlightState

const highlightSlice = createSlice({
  name: "highlight",
  initialState,
  reducers: {
    updateHighlight(state, action: PayloadAction<string>) {
      state.value = action.payload
    }
  }
})

export const { updateHighlight } = highlightSlice.actions
export default highlightSlice.reducer