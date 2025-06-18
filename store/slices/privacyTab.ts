import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface privacyTabState {
    value: boolean;
  }
  
const initialState = { value: false } satisfies privacyTabState as privacyTabState


export const privacyTabSlice = createSlice({
  name: "tabType",
  initialState,
  reducers: {
    activeTab: (state, action: PayloadAction<boolean>) => {
        state.value = action.payload
    }
  }
});

export const { activeTab } = privacyTabSlice.actions

export default privacyTabSlice.reducer