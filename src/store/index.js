import {configureStore} from "@reduxjs/toolkit";
import schedulesSlice from './schedulesSlice'
import journalSlice from './journalSlice'
import menuSlice from "./menuSlice";
import userSlice from "./userSlice"
import blackoutSlice from "./blackoutSlice"

export default configureStore({
    reducer:{
        schedules: schedulesSlice,
        journal: journalSlice,
        menu: menuSlice,
        user: userSlice,
        blackout: blackoutSlice,
    }
})