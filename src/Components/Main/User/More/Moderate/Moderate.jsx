import './moderate.css'
import {useState} from "react";
import Loader from "../../../../Reusable/Loader/Loader";
import DontHaveData from "../../../../Reusable/DontHaveData/DontHaveData";
import NotSelected from "../../../../Reusable/NotSelected/NotSelected";
import {useSelector} from "react-redux";
import SelectList from "../../../../Reusable/SelectList/SelectList";
import CheckList from "./List/CheckList";

export default function Moderate() {
    const [chosenSubj, setChosenSubj] = useState('subject')
    const [chosenMode, setChosenMode] = useState('Absent')

    const schedule = useSelector(state => state.schedules.schedulesList)[0]
    const groupName = useSelector(state => state.schedules.groupName)
    const statusSchedule = useSelector(state => state.schedules.status)
    const statusJournal = useSelector(state => state.journal.status)
    const errorSchedule = useSelector(state => state.schedules.error)
    const errorJournal = useSelector(state => state.journal.error)

    function newSubject(e) {
        let subj = e.target.textContent
        if (subj !== '') {
            setChosenSubj(e.target.textContent)
        }
    }

    function setMode(e) {
        let mode = e.target.textContent
        if (mode !== '') {
            setChosenMode(e.target.textContent)
        }
    }

    return (
        <>
            <div className={'moderate'}
                 style={{display: (!statusSchedule || !statusJournal) || (errorSchedule || errorJournal) ? 'flex' : 'block'}}>
                {!statusSchedule || !statusJournal ? <Loader/> :
                    errorSchedule || errorJournal ? <DontHaveData/> : (
                        <>
                            <div className={'journal__button__div'}>
                                <SelectList isDisabled={groupName === 'group' && 1}
                                            handleListClick={(e) => newSubject(e)}
                                            list={groupName === 'group' || Object.keys(schedule[groupName]).length === 0 ? [] : schedule[groupName]['subjects']}
                                            name={chosenSubj}/>
                                <SelectList isDisabled={groupName === 'group' && 1}
                                            handleListClick={(e) => setMode(e)}
                                            list={['Present', 'Absent']}
                                            name={chosenMode}/>
                            </div>
                            {groupName === 'group' || chosenSubj === 'subject' ?
                                <NotSelected text={`a subject ${groupName === 'group' ? 'and a group' : ''}`}/> : (
                                    <div className={'moderate__list'}>
                                        <h2 className={'moderate__list__title'}>{chosenSubj}</h2>
                                        <CheckList subject={chosenSubj} mode={chosenMode}/>
                                    </div>
                                )}
                        </>
                    )}
            </div>
        </>
    )
}