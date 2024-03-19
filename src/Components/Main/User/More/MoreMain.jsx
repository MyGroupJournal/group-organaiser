import {Route, Routes, useNavigate} from "react-router-dom";
import Category from "./Category/Category";
import {useEffect} from "react";
import JournalMore from "./JournalMore/JournalMore";
import {useSelector} from "react-redux";
import Loader from "../../../Reusable/Loader/Loader";
import DontHaveData from "../../../Reusable/DontHaveData/DontHaveData";
import NotSelected from "../../../Reusable/NotSelected/NotSelected";
import Moderate from "./Moderate/Moderate";
import Group from "./Group/Group";

export default function MoreMain() {
    const navigate = useNavigate()
    const schedule = useSelector(state => state.schedules.schedulesList)[0]
    const groupName = useSelector(state => state.schedules.groupName)
    const statusSchedule = useSelector(state => state.schedules.status)
    const statusJournal= useSelector(state => state.journal.status)
    const errorSchedule = useSelector(state => state.schedules.error)
    const errorJournal = useSelector(state => state.journal.error)

    useEffect(() => {
        if (!localStorage.user) navigate('/#')
    }, [navigate]);

    return (
        <Routes>
            <Route path={''} element={<Category/>}/>
            <Route path={'journal'} element={
                <div className={'journal'}
                     style={{display: (!statusSchedule || !statusJournal) || (errorSchedule || errorJournal) ? 'flex' : 'block'}}>
                    {!statusSchedule || !statusJournal ? <Loader/> :
                        errorSchedule || errorJournal ? <DontHaveData/> : (
                            <>
                                {groupName === 'group' || Object.keys(schedule[groupName]).length === 0?
                                    <NotSelected text={`a group`}/> : (
                                        <JournalMore/>
                                    )}
                            </>
                        )}
                </div>
            }/>
            <Route path={'moderate'} element={<Moderate/>}/>
            <Route path={'group'} element={<Group/>}/>
        </Routes>
    )
}