import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  value: string
}

const initialState = { value: "" } satisfies TokenState as TokenState

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    refreshToken(state, action: PayloadAction<string>) {
      state.value = action.payload
    }
  }
})

export const { refreshToken } = tokenSlice.actions
export default tokenSlice.reducer