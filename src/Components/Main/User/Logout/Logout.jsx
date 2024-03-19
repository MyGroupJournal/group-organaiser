import './logout.css'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../../../../store/userSlice";
import {useEffect} from "react";
export default function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleLogout() {
        dispatch(logoutUser())
        localStorage.removeItem('user')
        navigate('/')
    }

    useEffect(() => {
        if(!localStorage.user) navigate('/')
    }, [navigate]);
    return(
        <div className={'logoutPage'}>
            <button className={'logout__logout'} onClick={handleLogout}>Logout</button>
            <button className={'logout__cancel'} onClick={() => navigate('/more')}>Cancel</button>
        </div>
    )
}