export default function formatedDate(date) {
    date = date.split('.')
    return `${date[0]}.${date[1]}`
}