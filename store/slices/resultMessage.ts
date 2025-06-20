import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const options = ["created", "edited", "deleted", "updated", "changed", "deactivated", "copied"]

type resultValue = {
    visible: boolean;
    success: boolean | null;
    action: string;
    type: typeof options[number];
}

interface resultMessageState {
    value: resultValue
}

const initialState = {
    value: {
        visible: false,
        success: null,
        action: "",
        type: ""
    }
} satisfies resultMessageState as resultMessageState

type PayloadData = {
    success: boolean;
    action: string;
    type: string;
}


export const resultMessageSlice = createSlice({
    name: "resultMessage",
    initialState,
    reducers: {
        setResultMessage: (state, action: PayloadAction<PayloadData>) => {
            state.value.visible = true
            state.value.success = action.payload.success
            state.value.type = action.payload.type
            state.value.action = action.payload.action
        },
        initResetResultMessage: state => {
            state.value.visible = false
        },
        resetResultMessage: state => {
            state.value = initialState.value
        }
    }
});

export const { setResultMessage, initResetResultMessage, resetResultMessage } = resultMessageSlice.actions

export default resultMessageSlice.reducer