import './App.css';
import SideMenu from "./Components/SideMenu/SideMenu";
import Main from './Components/Main/Main'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getData, getLink, setData} from "./store/journalSlice";
import {getSchedules} from "./store/schedulesSlice";
import {recoverUser} from "./store/userSlice";
import Blackout from "./Components/Main/Blackout/Blackout";
import isWeekPast from "./Components/functions/isWeekPast";
import {json} from "react-router-dom";

function App() {
    const dispatch = useDispatch()
    const journalLink = useSelector(state => state.journal.journalLink)
    const blackout = useSelector(state => state.blackout.blackout)
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        dispatch(getSchedules())
        if (localStorage.date && localStorage.data) {
            if (isWeekPast(new Date(localStorage.date))) {
                dispatch(getLink())
            } else dispatch(setData(JSON.parse(localStorage.data)))
        } else dispatch(getLink())

    }, [dispatch]);

    useEffect(() => {
        if (journalLink !== null) {
            dispatch(getData());
        }
    }, [dispatch, journalLink]);

    useEffect(() => {
        if (localStorage.user && user === null) dispatch(recoverUser(localStorage.user))
    }, [dispatch]);

    return (
        <>
            {blackout && <Blackout/>}
            <SideMenu/>
            <Main/>
        </>
    );
}

export default App;
