import './createBlock.css'
import image1 from '../../../../../../assets/img/journal.png'
import image2 from '../../../../../../assets/img/moderate.png'
import image3 from '../../../../../../assets/img/group.png'
export default function CreateBlock({user = 'writer', nextPage, type}){
    return(
        <div onClick={nextPage} className={'block'}>
            {user === 'writer' ? (
                <>
                    <img className={'block__img'} src={image1} alt="JournalMore"/>
                    <h3 className={'block__blockTitle'}>Journal</h3>
                </>
            ): (type === 'first') ?(
                    <>
                        <img className={'block__img'} src={image2} alt="Moderate"/>
                        <h3 className={'block__blockTitle'}>Moderate</h3>
                    </>
                ) :
                    <>
                        <img className={'block__img'} src={image3} alt="Group"/>
                        <h3 className={'block__blockTitle'}>Group</h3>
                    </>
            }
        </div>
    )
}