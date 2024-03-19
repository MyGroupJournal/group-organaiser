import Loader from "../../Reusable/Loader/Loader";
import NotSelected from "../../Reusable/NotSelected/NotSelected";
import uniqid from "uniqid";
import DontHaveData from "../../Reusable/DontHaveData/DontHaveData";
import {useSelector} from "react-redux";
import CreateProfessorsBlock from "./ProfessorsBlock/CreateProfessorsBlock";
import './professors.css'

export default function Professors() {
    const schedule = useSelector(state => state.schedules.schedulesList)[0]
    const status = useSelector(state => state.schedules.status)
    const group = useSelector(state => state.schedules.groupName)
    const errorSchedule = useSelector(state => state.schedules.error)


    return (
        <div className={'professors'}
             style={{display: (!status || errorSchedule) ? 'flex' : 'block'}}>
            {!status ? <Loader/> :
                !errorSchedule ?
                    group === 'group' ?
                        <NotSelected text={'a group'}/> :
                        schedule[group]['professors'] !== undefined ?
                            (<div className={'professors__wrapper'}>
                                {Object.keys(schedule[group]['professors'][0]).map((professor) => <CreateProfessorsBlock
                                    key={uniqid()} professor={professor}
                                    subj={schedule[group]['professors'][0][professor]}/>)}
                            </div>)
                            : <DontHaveData/> :
                    <DontHaveData/>
            }
            <div></div>
        </div>
    )
}