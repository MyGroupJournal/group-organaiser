import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CreateMonths from "./CreateMonth/CreateMonth";
import sortDates from "../../../../functions/sortDates";
import getMissingStudents from "../../../../functions/getMissingStudents";
import {setBlackout, setMissingInfo} from "../../../../../store/blackoutSlice";


export default function JournalMore() {
    const [date, setDate] = useState([])
    const [completedDate, setCompletedDate] = useState('')
    const [monthData, setMonthData] = useState([])
    const {groupName, schedulesList} = useSelector(state => state.schedules)
    const journal = useSelector(state => state.journal.journal)
    const dispatch = useDispatch()

    function setDateNext(e) {
        const newCompletedDate = e.target.textContent
        setCompletedDate(newCompletedDate)

        let setMonth = Number(newCompletedDate.split('.')[1]) - 1
        const filteredData = journal[setMonth].filter(element => element['Дата'] === newCompletedDate);
        setDate(filteredData)

        dispatch(setBlackout())
    }

    useEffect(() => {
        setMonthData(sortDates(journal))
        // eslint-disable-next-line
    }, [journal]);

    useEffect(() => {
        if (date.length > 0) {
            const missingStudents = getMissingStudents(date, schedulesList[0][groupName]['students'], schedulesList[0][groupName]['subjects']);
            dispatch(setMissingInfo({
                date: completedDate,
                mode: 'journal',
                missInfo: missingStudents
            }));
        }
        // eslint-disable-next-line
    }, [date]);

    return (
        <div className={'journalMore'}>
            <CreateMonths monthData={monthData} setData={setDateNext}/>
        </div>
    )
}