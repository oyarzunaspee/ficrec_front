import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  value: boolean;
}

const initialState = {
  value: true
} satisfies NavState as NavState

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    changeNav(state, action: PayloadAction<boolean>) {
      state.value = action.payload
    }
  }
})

export const { changeNav } = navSlice.actions
export default navSlice.reducer