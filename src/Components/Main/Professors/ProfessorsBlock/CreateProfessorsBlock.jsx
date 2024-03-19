import photo from '../../../../assets/img/professors.svg'
import {Divider} from "@mui/material";
import './professorsBlock.css'

export default function CreateProfessorsBlock({professor, subj}) {

    return (
        <div className={'professor'}>
            <img src={photo} alt="Profeesor" className={'professor__photo'}/>
            <div className={'professor__info'}>
                <h3 className={'professor__info__name'}>{professor}</h3>
                <Divider/>
                <p className={'professor__info__subject'}>{subj}</p>
            </div>
        </div>
    )
}