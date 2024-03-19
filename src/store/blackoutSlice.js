import {createSlice} from "@reduxjs/toolkit";

const blackoutSlice = createSlice({
    name: 'blackout',
    initialState: {
        blackout: false,
        date: null,
        mode: null,
        missInfo: null,
    },
    reducers: {
        setBlackout(state) {
            state.blackout = !state.blackout
        },
        setMissingInfo(state, action) {
            state.date = action.payload.date
            state.mode = action.payload.mode
            state.missInfo = action.payload.missInfo
        },
    }
})

export const {setBlackout, setMissingInfo} = blackoutSlice.actions
export default blackoutSlice.reducer