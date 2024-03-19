import './blackout.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {useDispatch, useSelector} from "react-redux";
import {setBlackout} from "../../../store/blackoutSlice";
import uniqid from "uniqid";

export default function Blackout() {
    const dispatch = useDispatch()
    const {date, mode, missInfo} = useSelector(state => state.blackout)

    function handleClose() {
        dispatch(setBlackout())
    }

    return (
        <div className={'blackout'}>
            <div className={'missing'}>
                <CloseOutlinedIcon className={'missing__close'} sx={{fontSize: 30}} onClick={handleClose}/>
                {mode === 'journal' && (
                    <>
                        <div className={'missing__head'}>
                            <h2 className={'missing__head__title'}>Absent on {date} :</h2>
                        </div>
                        <div className={'missing__main'}>
                            <ul className={'missing__main__ul'}>
                                {missInfo.map(element => {
                                    let students = Object.values(element)[0]['students'];
                                    const modifiedStudents = students.map(student => (students.indexOf(student) < students.length - 1) ? student + ', ': student);
                                    return (
                                        <li key={uniqid()} className={'missing__main__ul__missedLi'}>
                                            <h3 className={'missing__main__subject'}>{Object.values(element)[0]['course']} :</h3>
                                            <p className={'missing__main__students'}>{modifiedStudents.join('').toString()}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}