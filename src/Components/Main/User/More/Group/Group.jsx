import './group.css'
import Loader from "../../../../Reusable/Loader/Loader";
import DontHaveData from "../../../../Reusable/DontHaveData/DontHaveData";
import SelectList from "../../../../Reusable/SelectList/SelectList";
import NotSelected from "../../../../Reusable/NotSelected/NotSelected";
import {useState} from "react";
import {useSelector} from "react-redux";
import MissStudent from "./CreateMissStudent/missStudent";

export default function Group() {

    const [chosenSubj, setChosenSubj] = useState('subject')
    const [chosenStudent, setChosenStudent] = useState('student')

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

    function setStudent(e) {
        let mode = e.target.textContent
        if (mode !== '') {
            setChosenStudent(e.target.textContent)
        }
    }

    return (
        <>
            <div className={'group'}
                 style={{display: (!statusSchedule || !statusJournal) || (errorSchedule || errorJournal) ? 'flex' : 'block'}}>
                {!statusSchedule || !statusJournal ? <Loader/> :
                    errorSchedule || errorJournal ? <DontHaveData/> : (
                        <>
                            <div className={'group__button__div'}>
                                <SelectList isDisabled={groupName === 'group' && 1}
                                            handleListClick={(e) => newSubject(e)}
                                            list={groupName === 'group' || Object.keys(schedule[groupName]).length === 0 ? [] : [...schedule[groupName]['subjects'], 'All']}
                                            name={chosenSubj}/>
                                <SelectList isDisabled={groupName === 'group' && 1}
                                            handleListClick={(e) => setStudent(e)}
                                            list={groupName === 'group' || Object.keys(schedule[groupName]).length === 0 ? [] : schedule[groupName]['students']}
                                            name={chosenStudent}/>
                            </div>
                            {groupName === 'group' || chosenSubj === 'subject' || chosenStudent === 'student'?
                                <NotSelected
                                    text={`a subject ${groupName === 'group' ? chosenStudent === 'student' ? ', student' : '' : chosenStudent === 'student' ? 'and student' : ''} ${groupName === 'group' ? 'and a group' : ''}`}/> : (
                                    <div className={'group__miss'}>
                                        <MissStudent student={chosenStudent} subject={chosenSubj}/>
                                    </div>
                                )}
                        </>
                    )}
            </div>
        </>
    )
}