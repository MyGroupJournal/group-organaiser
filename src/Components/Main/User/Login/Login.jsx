import {useEffect, useState} from "react";
import LoginPage from "./LoginPage/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {checkUserInput} from "../../../../store/userSlice";
import './login.css'
import {useNavigate} from "react-router-dom";

export default function Login(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)

    function textEnter(e){setLogin(e.target.value)}
    function passwordEnter(e){setPassword(e.target.value)}
    function handleVerify(e){
        e.preventDefault();
        e.stopPropagation();
        dispatch(checkUserInput({login, password}))
        setPassword('')
    }


    useEffect(() => {
        if(user !== null){
            navigate('/more')
            localStorage.setItem('user',user)
        }
        // eslint-disable-next-line
    }, [user]);
    return(
            <div className={'login'}>
                <LoginPage passwordEnter={passwordEnter} textEnter={textEnter} password={password} text={login}
                           handle={handleVerify}/>
            </div>
    )
}