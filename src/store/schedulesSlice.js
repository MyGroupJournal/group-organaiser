import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

export const getSchedules = createAsyncThunk(
    'schedules/getSchedules',
    async function (_, {rejectWithValue}) {
        try {
            const response = await axios.get('https://65e5ffb1d7f0758a76e7ec04.mockapi.io/shedule')
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const schedulesSlice = createSlice({
    name: 'schedules',
    initialState: {
        schedulesList: [],
        groupName: 'group',
        status: null,
        error: null
    },
    reducers: {
        changeGroup(state, action) {
            if (action.payload !== '') {
                state.groupName = action.payload
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getSchedules.pending, (state) => {
                state.status = false
            })
            .addCase(getSchedules.fulfilled, (state, action) => {
                state.status = true
                state.schedulesList = action.payload
            })
            .addCase(getSchedules.rejected, (state, action) => {
                state.status = true
                state.error = true
            })
    }
})
export const {changeGroup} = schedulesSlice.actions
export default schedulesSlice.reducer
