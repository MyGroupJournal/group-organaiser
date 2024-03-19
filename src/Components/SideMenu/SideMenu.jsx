import './sideMenu.css'
import logo from '../../assets/img/logoSvg.svg'
import {NavLink, useLocation, Link} from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {useEffect, useRef} from "react";
import SelectList from "../Reusable/SelectList/SelectList";
import {useDispatch, useSelector} from "react-redux";
import {changeGroup} from "../../store/schedulesSlice";
import {changeStatus} from "../../store/menuSlice";

function SideMenu() {
    const dispatch = useDispatch()
    const menu = useRef()
    const schedules = useSelector(state => state.schedules.schedulesList)[0]
    const group = useSelector(state => state.schedules.groupName)
    const status = useSelector(state => state.menu.menuStatus)
    const user = useSelector(state => state.user.user)
    const link = useLocation()['pathname'].replace('/', '')

    useEffect(() => {
        if (localStorage.group !== undefined) {
            dispatch(changeGroup(localStorage.group))
        }
    }, [dispatch]);

    useEffect(() => {
        if(!status){
            menu.current.checked = false
            dispatch(changeStatus())
        }
        // eslint-disable-next-line
    }, [dispatch, link]);

    return (
        <header className={'header'}>
            <input ref={menu} onChange={() => dispatch(changeStatus())} className="side__menu" type="checkbox" id="side__menu"/>
            <label className="hamb" htmlFor="side__menu"><p className={'side__menu__text'}>Menu</p><span
                className="hamb__line"></span></label>
            <div className='nav__logo'>
                <Link to={''} className={'logoDiv'}>
                    <img src={logo} alt="Logo"/>
                    <h3 className='logo__name'>Journal</h3>
                </Link>
            </div>
            <nav className='nav'>
                    <div className='nav__categories'>
                        <div className='category__link'>
                            <NavLink to='' className='category__link__name'><HomeOutlinedIcon sx={{fontSize: 30}}/><p
                                className={'category__link__name__title'}>Home</p></NavLink>
                        </div>
                        <div className='category__link'>
                            <NavLink to='journal' className='category__link__name'> <GroupsOutlinedIcon
                                sx={{fontSize: 30}}/>
                                <p className={'category__link__name__title'}>Journal</p></NavLink>
                        </div>
                        <div className='category__link'>
                            <NavLink to='schedule' className='category__link__name'> <CalendarMonthOutlinedIcon
                                sx={{fontSize: 30}}/>
                                <p className={'category__link__name__title'}>Schedule</p></NavLink>
                        </div>
                        <div className='category__link'>
                            <NavLink to='professors' className='category__link__name'> <SchoolOutlinedIcon
                                sx={{fontSize: 30}}/>
                                <p className={'category__link__name__title'}>Professors</p></NavLink>
                        </div>
                    </div>
                    <div className='nav__button-group'>
                        {schedules !== undefined &&
                            <SelectList mode={'sideMenu'} name={group} list={Object.keys(schedules)}/>
                        }
                    </div>
                    <div className='nav__account'>
                        {user !== null ? (
                                <>
                                    <div className={'more'}>
                                        <NavLink to='more' className='account__userOption__link'>
                                            <MoreHorizOutlinedIcon
                                                sx={{fontSize: 30}}/>
                                            <p className={'account__userOption__link__title'}>More</p></NavLink>
                                    </div>
                                    <div className={'logout'}>
                                        <NavLink to='logout' className='account__userOption__link'>
                                            <LogoutOutlinedIcon
                                                sx={{fontSize: 30}}/>
                                            <p className={'account__userOption__link__title'}>Logout</p></NavLink>
                                    </div>
                                </>) :
                            (
                                <div className={'login'}>
                                    <NavLink to='login' className='account__userOption__link'> <LoginOutlinedIcon
                                        sx={{fontSize: 30}}/>
                                        <p className={'account__userOption__link__title'}>Login</p></NavLink>
                                </div>
                            )
                    }
                    </div>
            </nav>
        </header>
    )
}

export default SideMenu