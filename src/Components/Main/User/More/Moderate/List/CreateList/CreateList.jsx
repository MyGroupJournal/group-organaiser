import './createList.css'
export default function CreateList({student, changeData, id}){
    return(
        <>
            <div className={'student'} id={id}>
                <p>{id+1}. {student}</p>
                <input onChange={changeData} type="checkbox"/>
            </div>
        </>
    )
}