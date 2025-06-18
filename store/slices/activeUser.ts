import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  value: boolean;
}

const initialState = { value: false } satisfies UserState as UserState

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState,
  reducers: {
    active(state) {
      state.value = true
    }
  }
})

export const { active } = activeUserSlice.actions
export default activeUserSlice.reducer