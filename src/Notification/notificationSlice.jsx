import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        type: '',
        payload: '',
        id: Math.random(), //id field is set because if the same notification text is sent Redux wont treat it as new state.
    },
    reducers: {
        error: (state, action) => {
            state.type = 'error'
            state.payload = action.payload;
            state.id = Math.random();
        },
        success: (state, action) => {
            state.type = 'success'
            state.payload = action.payload;
            state.id = Math.random();
        },
        httpError: (state, action) => {
            state.type = 'httpError'
            state.payload = action.payload;
            state.id = Math.random();
        }
    }
})

export const { error, success, httpError } = notificationSlice.actions

export default notificationSlice.reducer