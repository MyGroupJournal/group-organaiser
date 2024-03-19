import uniqid from "uniqid";
import {Divider} from "@mui/material";
import './day.css'

export default function CreateDay({data, id}) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const today = new Date().getDay()
    function createSubject(subject, time) {
        const subj = Object.keys(subject)
        let singleSubj = subject[subj]
        return (
            <div className={'day__subjects__subject'}>
                <p className={'subject__title'}>{subj[0]}</p>
                <Divider orientation="vertical" variant='middle'/>
                <p className={'subject__time'}>{time === undefined ? singleSubj['time']: time}</p>
                <Divider orientation="vertical" variant='middle'/>
                <p className={'subject__cab'}>{singleSubj['cab']}</p>
                <Divider orientation="vertical" variant='middle'/>
                <p className={'subject__type'}>{Number(singleSubj['type']) === 0 ? 'prac' : 'lec'}</p>
                <Divider orientation="vertical" variant='middle'/>
                <p className={'subject__place ' + (Number(singleSubj['place']) === 0 ? 'green' : 'red')}></p>
            </div>
        )
    }
    return (
        <div key={uniqid()} className={'day ' + (today - 1 === id ? 'today': '')}>
        <h3 className={'day__header__name'}>{daysOfWeek[id]}</h3>
            <Divider variant='fullWidth'/>
            <div className={'day__subjects'}>
                {data.map(subject => {
                    return createSubject(subject)
                })}
               {data.map(subject => {
                    if (subject[Object.keys(subject)[0]]['rep']) return createSubject(subject, subject[Object.keys(subject)[0]]['rep'])
                   else return null
                })}
            </div>
        </div>
    )
}