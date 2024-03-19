import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const getLink = createAsyncThunk(
    'schedules/getLink',
    async function (_, {rejectWithValue}) {
        try {
            const response = await axios.get('https://65e5ffb1d7f0758a76e7ec04.mockapi.io/linkAPI')
            return response.data[0]['link']
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const getData = createAsyncThunk(
    'data/getData',
    async function (_, {rejectWithValue, getState}) {
        try {
            let tempArr = []
            const state = getState();
            const subjectsSheet = await axios.get(state.journal.journalLink)
            const lenOfSubjects = Object.keys(subjectsSheet.data.data).length - 1
            for (let i = 1; i < lenOfSubjects + 1; i++) {
                const response = await axios.get(state.journal.journalLink + '/' + i)
                if (response.statusText === 'OK') {
                    response.data.data.forEach(element => {
                        let month = [Number(element['Дата'].split('.')[1])] - 1;
                        element['Subj'] = i - 1
                        if (!tempArr[month]) tempArr[month] = [];
                        tempArr[month].push(element)
                    })
                }
            }
            return tempArr
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


const dataSlice = createSlice({
    name: 'data',
    initialState: {
        journal: [],
        status: null,
        error: null,
        journalLink: null,
        subject: null,
    },
    reducers: {
        getJournalBySubject(state, action) {
            state.groupData = state.journal.flat().filter(day => Number(day['Subj']) === action.payload);
        },
        addReducer(state, action) {
            let newData = action.payload.dataSend
            newData['Subj'] = action.payload.id - 1
            state.journal[action.payload.monthID].push(newData)
            state.status = true
        },
        updateReducer(state, action) {
            let newData = action.payload.dataSend
            newData['Subj'] = action.payload.id - 1
            let filteredData = state.journal[action.payload.monthID].filter(element => Number(element['Subj']) === Number(newData['Subj']))
            let indexChanged = state.journal[action.payload.monthID].indexOf(filteredData.find(element => element['Дата'] === newData['Дата']))
            state.journal[action.payload.monthID][indexChanged] = newData
            state.status = true
        },
        editStatus(state) {
            state.status = !state.status
        },
        setSubject(state, action) {
            state.subjecy = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getData.pending, (state) => {
                state.status = false
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.status = true
                state.journal = action.payload
            })
            .addCase(getData.rejected, (state, action) => {
                state.status = true
                state.error = true
            })
            .addCase(getLink.pending, (state) => {
                state.status = false
            })
            .addCase(getLink.fulfilled, (state, action) => {
                state.status = true
                state.journalLink = action.payload
            })
            .addCase(getLink.rejected, (state, action) => {
                state.status = true
                state.error = true
            })
    },
})

export const {getJournalBySubject, setSubject, addReducer, updateReducer, editStatus} = dataSlice.actions
export default dataSlice.reducer