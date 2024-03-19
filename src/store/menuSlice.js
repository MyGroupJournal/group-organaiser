import {createSlice} from "@reduxjs/toolkit";

const menuSlice = createSlice({
        name: 'menu',
        initialState: {
            menuStatus: true,
        },
        reducers: {
            changeStatus(state) {
                state.menuStatus = !state.menuStatus
            },
        }
    }
)

export const {changeStatus} = menuSlice.actions
export default menuSlice.reducer