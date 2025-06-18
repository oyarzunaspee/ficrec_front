import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PopUp = {
  open: boolean;
  type: string;
}

interface PopUpState {
  value: PopUp
}

const initialState = { value: { open: false, type: "" } } satisfies PopUpState as PopUpState

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    open(state, action: PayloadAction<string>) {
      state.value.open = true
      state.value.type = action.payload
    },
    close(state) {
      state.value.open = false
      state.value.type = ""
    }
  }
})

export const { open, close } = popupSlice.actions
export default popupSlice.reducer