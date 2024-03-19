import './journalList.css'
import {Divider} from "@mui/material";
import {Fragment} from "react";
import dataForTable from "../../../functions/dataForTable";
import {useSelector} from "react-redux";
import uniqid from "uniqid";

export default function JournalList() {
    const groupData = useSelector(state => state.journal.groupData)
    const groupName = useSelector(state => state.schedules.groupName)
    const students = useSelector(state => state.schedules.schedulesList)[0][groupName]['students']

    function createMissTable(data) {
        const {dates, missed} = dataForTable(data)
        return (
            <div className={'missed__div'}>
                <table className={'missed__table'}>
                    <thead className={'missed__table__head'}>
                    <tr>
                        {dates.map(date => (
                            <Fragment key={uniqid()}>
                                <td>{date}</td>
                                <td><Divider orientation="vertical" variant="inset"/></td>
                            </Fragment>
                        ))}
                    </tr>
                    </thead>
                    <tbody className={'missed__table__body'}>
                    {missed.map(miss => (
                        <tr className={'students__table__body__miss'}>
                            {miss.map(res => (
                                <Fragment key={uniqid()}>
                                    <td>{res}</td>
                                    <td><Divider orientation="vertical" variant="inset"/></td>
                                </Fragment>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        )
    }

    function createStudentTable(data) {
        return (
            <table className={'students__table'}>
                <thead className={'students__table__head'}>
                <tr>
                    <td>№</td>
                    <td><Divider orientation="vertical" variant="inset"/></td>
                    <td>Student</td>
                    <td><Divider orientation="vertical" variant="inset"/></td>
                </tr>
                </thead>
                <tbody className={'students__table__body'}>
                {data.map((student, id) => (
                    <tr key={uniqid()} className={'stu dents__table__body__student'}>
                        <td>{id + 1}</td>
                        <td><Divider orientation="vertical" variant="inset"/></td>
                        <td>{student}</td>
                        <td><Divider orientation="vertical" variant="inset"/></td>
                    </tr>))}
                </tbody>
            </table>
        )
    }

    return (
        <>
            {students !== undefined && (
                <table className={'journal__table'}>
                    <tbody>
                    <tr>
                        <td className={'students'}>{createStudentTable(students)}</td>
                        <td className={'missed'}>{createMissTable(groupData)}</td>
                    </tr>
                    </tbody>
                </table>
            )}
        </>
    )
}