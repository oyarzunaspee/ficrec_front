import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DisplayValue {
    fandom: boolean;
    ship: boolean;
    tags: boolean;
    warnings: boolean;
    summary: boolean;
    characters: boolean;
}

interface DisplayState {
    value: DisplayValue;
}

const initialState = {
    value: {
        fandom: true,
        ship: true,
        tags: true,
        warnings: true,
        summary: true,
        characters: true,
    },
} satisfies DisplayState as DisplayState

export const collectionDisplaySlice = createSlice({
    name: "collectionDisplay",
    initialState,
    reducers: {
        initDisplay: (state, action: PayloadAction<DisplayValue>) => {
            const keys = Object.keys(state.value) as (keyof DisplayValue)[];
            for (let i of keys) {
                state.value[i] = action.payload[i]
            }
        },
        updateDisplay: (state, action: PayloadAction<keyof DisplayValue>) => {
            const key = action.payload;
            state.value[key] = !state.value[key]
        }
    }
});

export const { initDisplay, updateDisplay } = collectionDisplaySlice.actions

export default collectionDisplaySlice.reducer