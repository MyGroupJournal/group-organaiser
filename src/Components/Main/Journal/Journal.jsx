import './journal.css'
import {useDispatch, useSelector} from "react-redux";
import NotSelected from "../../Reusable/NotSelected/NotSelected";
import SelectList from "../../Reusable/SelectList/SelectList";
import Loader from "../../Reusable/Loader/Loader";
import {useEffect, useState} from "react";
import JournalList from "./JournalLIst/JournalList";
import {getJournalBySubject} from "../../../store/journalSlice";
import DontHaveData from "../../Reusable/DontHaveData/DontHaveData";

export default function Journal() {
    const [chosenSubj, setChosenSubj] = useState('subject')
    const groupName = useSelector(state => state.schedules.groupName)
    const subjects = useSelector(state => state.schedules.schedulesList)[0]
    const statusSchedule = useSelector(state => state.schedules.status)
    const statusJournal = useSelector(state => state.journal.status)
    const errorSchedule = useSelector(state => state.schedules.error)
    const errorJournal = useSelector(state => state.journal.error)
    const dispatch = useDispatch()

    function newSubject(e) {
        let subj = e.target.textContent
        if (subj !== '') {
            setChosenSubj(e.target.textContent)
            dispatch(getJournalBySubject(subjects[groupName]['subjects'].indexOf(subj)))
        }
    }

    useEffect(() => {
        setChosenSubj('subject')
    }, [groupName]);
    return (
        <div className={'journal'} style={{display: (!statusSchedule || !statusJournal) || (errorSchedule || errorJournal) ? 'flex' : 'block'}}>
            {!statusSchedule || !statusJournal ? <Loader/> :
                errorSchedule || errorJournal ? <DontHaveData/> :(
                <>
                    <div className={'journal__button__div'}>
                        <SelectList isDisabled={groupName === 'group' && 1} handleListClick={(e) => newSubject(e)}
                                    list={groupName === 'group' ? [] : subjects[groupName]['subjects'] === undefined ? [] : subjects[groupName]['subjects']}
                                    name={chosenSubj}/>
                    </div>
                    {groupName === 'group' || chosenSubj === 'subject' ?
                        <NotSelected text={`a subject ${groupName === 'group' ? 'and a group' : ''}`}/> : (
                            <div className={'journal__list'}>
                                <JournalList/>
                            </div>
                        )}
                </>
            )}
        </div>
    )
}