import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {decryptText} from "../Components/functions/cryptoUtilt";

export const checkUserInput = createAsyncThunk(
    "user/checkUserInput",
    async function({login, password}, {rejectWithValue}){
        try {
            const responce = await axios.get('https://65c9232ea4fbc162e112a614.mockapi.io/test/myJournal')
                if (Object.keys(responce.data[0]).filter(key => key === login)[0] && responce.statusText === 'OK') {
                        const decrypted = decryptText(responce.data[0][login], '9857bc14-eb97-4fd4-9a40-34b073184545');
                        if(decrypted === password) {
                            return login
                        }
                    }
        }catch (error) {
            return rejectWithValue(error)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: null,
        isWrite : false,
        status: false,
        error: null
    },
    reducers:{
        recoverUser(state, action){
            state.user = action.payload
            state.isWrite = true
        },
        logoutUser(state){
            state.user = null
            state.isWrite = false
        }
    },
    extraReducers(builder){
        builder
            .addCase(checkUserInput.pending, (state) => {
                state.status = true
            })
            .addCase(checkUserInput.fulfilled, (state, action) => {
                state.status = false
                if (action.payload !== undefined) {
                    state.isWrite = true
                    state.user = action.payload
                }
            })
            .addCase(checkUserInput.rejected, (state) => {
                state.status = false
                state.error = true
            })
    }
    }
)

export const {recoverUser, logoutUser} = userSlice.actions
export default userSlice.reducer