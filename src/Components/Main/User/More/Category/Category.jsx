import {useNavigate} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import CreateBlock from "./CreateBlock/CreateBlock";
import './category.css'

export default function Category() {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()

    function nextPage(e) {
        if (e) {
            let nextPage = e.target.closest('.block').children[1].textContent.toLowerCase()
            navigate(nextPage)
        }
    }

    return (
        <div className={'variantsBlock'}>
            <div className={'variantsBlock__variants'}>
                <CreateBlock nextPage={nextPage}/>
                {(user === 'helper' || user === 'admin') &&
                    <CreateBlock type={'first'} nextPage={nextPage} user={user}/>}
                {(user === 'admin') && <CreateBlock type={'second'} nextPage={nextPage} user={user}/>}
            </div>
        </div>
    )
}