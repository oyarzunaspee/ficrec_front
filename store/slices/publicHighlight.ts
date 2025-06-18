import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type PublicHighlight = {
  personal: boolean;
  text: string;
  label: string;
  border: string;
  bg: string;
}

interface PublicHighlightState {
  value: PublicHighlight
}

const initialState = {
  value: {
    personal: false,
    text: "text-grave",
    label: "text-secondary",
    border: "border-grave",
    bg: "bg-hover",
  }
} satisfies PublicHighlightState as PublicHighlightState

const publicHighlightSlice = createSlice({
  name: 'publicHighlight',
  initialState,
  reducers: {
    updateHighlight(state, color: PayloadAction<string>) {
      state.value = {
        personal: true,
        text: "text-" + color.payload,
        label: "text-" + color.payload,
        border: "border-" + color.payload,
        bg: "bg-" + color.payload
      }
    }
  }
})

export const { updateHighlight } = publicHighlightSlice.actions
export default publicHighlightSlice.reducer