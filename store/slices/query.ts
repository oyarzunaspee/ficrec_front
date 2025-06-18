import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QueryState {
  value: string;
}

const initialState = { value: "" } satisfies QueryState as QueryState

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    updateQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
});

export const { updateQuery } = querySlice.actions

export default querySlice.reducer