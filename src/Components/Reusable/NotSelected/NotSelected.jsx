import './notSelected.css'
import choose from '../../../assets/img/choose.svg'
export default function NotSelected({text}) {
    return(
        <div className='parIsNotSelected'>
            <img src={choose} className={'parIsNotSelected__img'} alt="Parameter is not selected"/>
            <h2 className={'parIsNotSelected__text'}>Please select {text}</h2>
        </div>
    )
}