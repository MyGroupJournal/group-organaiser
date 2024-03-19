import './App.css';
import SideMenu from "./Components/SideMenu/SideMenu";
import Main from './Components/Main/Main'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getData, getLink} from "./store/journalSlice";
import {getSchedules} from "./store/schedulesSlice";
import {recoverUser} from "./store/userSlice";
import Blackout from "./Components/Main/Blackout/Blackout";

function App() {
    const dispatch = useDispatch()
    const journalLink = useSelector(state => state.journal.journalLink)
    const blackout = useSelector(state => state.blackout.blackout)

    useEffect(() => {
        dispatch(getSchedules())
        dispatch(getLink())
    }, [dispatch]);

    useEffect(() => {
        if (journalLink !== null){
            dispatch(getData())
        }
    }, [dispatch, journalLink]);


    useEffect(() => {
        if(localStorage.user !== undefined){
            dispatch(recoverUser(localStorage.user))
        }
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
