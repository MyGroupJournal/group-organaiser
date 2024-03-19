import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import './checkList.css'
import {useDispatch, useSelector} from "react-redux";
import CreateList from "./CreateList/CreateList";
import {addReducer, editStatus, updateReducer} from "../../../../../../store/journalSlice";
import axios from "axios";

export default function CheckList({subject, mode}) {
    const [dataSend, setDataSend] = useState({})
    const dispatch = useDispatch()
    const {groupName, schedulesList} = useSelector(state => state.schedules)
    const journalLink = useSelector(state => state.journal.journalLink)
    const students = schedulesList[0][groupName]['students']
    const subjects = schedulesList[0][groupName]['subjects']
    const navigate = useNavigate()

    const date = new Date()
    const formatedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`


    let data =
        [
            true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true,
            true, true, true, true, true, true, true, true, true,
            true, true, true, true
        ]
    if (mode === 'Present') data = data.map(element => !element)


    function changeData(current) {
        data[current.target.parentElement.id] = !data[current.target.parentElement.id]
    }


    function confirm() {
        if (window.confirm('Are you sure you want to send the data?')) {
            let confirmedData = {}
            for (let surname of students) {
                confirmedData[surname] = data[students.indexOf(surname)] ? 1 : 0;
            }
            confirmedData['Дата'] = formatedDate
            setDataSend(confirmedData)
        }
    }

    useEffect(() => {
        const axiosPutOrUpdate = async () => {
            navigate('/more')
            try {
                dispatch(editStatus())
                let id = subjects.indexOf(subject) + 1
                let monthID = date.getMonth()
                const response = await axios.get(`${journalLink}/${id}`);
                const filteredData = response.data.data.filter(element => element['Дата'] === formatedDate)
                if (filteredData.length === 1) {
                    await axios.put(`${journalLink}/${id}/${filteredData[0]['row_id']}`, {data: dataSend})
                    dispatch(updateReducer({dataSend, id, monthID}));
                } else {
                    await axios.post(`${journalLink}/${id}`, {data: dataSend});
                    dispatch(addReducer({dataSend, id, monthID}));
                }
            } catch (error) {
                console.error('Error executing requests:', error);
            }
            setDataSend([])
        }
        (Object.keys(dataSend).length > 0) && axiosPutOrUpdate()
        // eslint-disable-next-line
    }, [dataSend]);

    return (
        <div className={'checkList'}>
            <div className={'checkList__students'}>
                {students.map((student, id) => <CreateList student={student} id={id} key={id}
                                                           changeData={changeData}/>)}
            </div>
            <div className={'checkList__confirm'}>
                <button onClick={confirm} className={'checkList__confirm__button'}>Confirm</button>
            </div>
        </div>
    )
}