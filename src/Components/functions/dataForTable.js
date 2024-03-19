import formatedDate from "./formatedDate";

export default function dataForTable(data) {
    let dates = []
    let missed = []
    let dataWithoutDate = [];

    data.forEach((date, key) => Object.keys(date).forEach((element, id) => {
        if(element === 'row_id' || element === 'Subj') return
        if (element === 'Дата') {
            dates.push(formatedDate(date[element]));
        } else {
            let temp = date[element]
            if (dataWithoutDate[key] === undefined) {
                dataWithoutDate.push([temp])
            } else dataWithoutDate[key].push(temp)
        }
    }))

    dataWithoutDate.forEach((date) => Object.keys(date).forEach((element, id) => {
        let temp = date[element]
        if (missed[id] === undefined) {
            missed.push([temp])
        } else missed[id].push(temp)
    }))

    return {dates, missed}
}