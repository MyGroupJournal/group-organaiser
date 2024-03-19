import {useSelector} from "react-redux";
import NotSelected from "../../Reusable/NotSelected/NotSelected";
import CreateDay from "./Day/CreateDay";
import Loader from "../../Reusable/Loader/Loader";
import determineWeek from "../../functions/determineWeek";
import uniqid from "uniqid";
import './schedules.css'
import DontHaveData from "../../Reusable/DontHaveData/DontHaveData";
import {useEffect, useState} from "react";
import SelectList from "../../Reusable/SelectList/SelectList";

export default function Schedules() {
    const group = useSelector(state => state.schedules.groupName)
    const schedule = useSelector(state => state.schedules.schedulesList)[0]
    const status = useSelector(state => state.schedules.status)
    const errorSchedule = useSelector(state => state.schedules.error)
    const [week, setWeek] = useState(determineWeek())
    const [currentSchedule, setCurrentSchedule] = useState([])

    function sortDays() {
        if (schedule[group]['schedule'] !== undefined) {
            const weekGroupSchedule = schedule[group]['schedule'][week]
            setCurrentSchedule(Object.keys(weekGroupSchedule).map(day => weekGroupSchedule[day]))
        } else return []
    }

    function handlerWeek(e) {
        let week = e.target.textContent
        if (week !== '') {
            setWeek(week)
        }
    }

    useEffect(() => {
        !errorSchedule && group !== 'group' && status && sortDays()
        // eslint-disable-next-line
    }, [week, group, status, errorSchedule]);

    return (
        <div className={'schedule'}
             style={{display: (!status || errorSchedule) ? 'flex' : 'block'}}>
            {!status ? <Loader/> :
                !errorSchedule ?
                    group === 'group' ?
                        <NotSelected text={'a group'}/> :
                        Object.keys(schedule[group]).length !== 0 ?
                            (<>
                                <div className={'schedule__button__div'}>
                                    <SelectList isDisabled={group === 'group' && 1}
                                                handleListClick={(e) => handlerWeek(e)}
                                                list={[1, 2]}
                                                name={week}/>
                                </div>
                                <div className={'schedule__wrapper'}>
                                    {currentSchedule.map((day, id) => <CreateDay key={uniqid()}
                                                                                 id={id}
                                                                                 data={day}/>)}
                                </div>
                            </>) : <DontHaveData/>:
                    <DontHaveData/>
            }
            <div></div>
        </div>
    )
}