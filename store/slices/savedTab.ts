import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface savedTabState {
    value: boolean | null;
  }
  
const initialState = { value: false } satisfies savedTabState as savedTabState


export const savedTabSlice = createSlice({
  name: "savedTab",
  initialState,
  reducers: {
    activeTab: (state, action: PayloadAction<boolean | null>) => {
        state.value = action.payload
    }
  }
});

export const { activeTab } = savedTabSlice.actions

export default savedTabSlice.reducer