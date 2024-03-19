import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import uniqid from "uniqid";
import './missStudent.css'

export default function MissStudent({student, subject}) {
    const journal = useSelector(state => state.journal.journal)
    const groupName = useSelector(state => state.schedules.groupName)
    const subjects = useSelector(state => state.schedules.schedulesList)[0][groupName]['subjects']
    const [missingDates, setMissingDates] = useState([])

    useEffect(() => {
        switch (subject) {
            case 'All':
                let fullObject = []
                let dataZero = journal.map(month => month.filter(element => Number(element[student]) === 0))
                dataZero.map(month => month.map(element => {
                    let subj = element['Subj']
                    fullObject[subj] ? fullObject[subj].push(element['Дата']) : (fullObject[subj] = [element['Дата']]);
                }))
                setMissingDates(fullObject)
                break
            default:
                let tempObj = []
                let filteredData = journal.map(month => month.filter(element => element['Subj'] === subjects.indexOf(subject)))
                filteredData.map(month => month.map(element => {
                    if (Number(element[student]) === 0) {
                        let subjIndex = element['Subj'];
                        tempObj[subjIndex] ? tempObj[subjIndex].push(element['Дата']) : (tempObj[subjIndex] = [element['Дата']]);
                    }
                }))
                setMissingDates(tempObj)
                break
        }
        // eslint-disable-next-line
    }, [subject, student]);

    return (
        <>
            <div className={'group__head'}>
                <h2 className={'group__head__title'}>{student} was absent :</h2>
            </div>
            <div className={'group__main'}>
                <ul className={'group__main__ul'}>
                    {missingDates.map((dates, id) => {
                        for (let key = 0; key < dates.length - 1; key++) {
                            dates[key] = dates[key] + ', '
                        }
                        return (
                            <li key={uniqid()} className={'group__main__ul__li'}>
                                <h3 className={'group__main__subject'}>{subjects[id]} :</h3>
                                <p className={'group__main__dates'}>{dates.join('').toString()}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}