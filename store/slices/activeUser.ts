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
    },
    deactive(state) {
      state.value = false
    }
  }
})

export const { active, deactive } = activeUserSlice.actions
export default activeUserSlice.reducer