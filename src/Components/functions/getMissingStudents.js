export default function getMissingStudents(date, students, subjects) {
    return date.map((element, id) => {
        const missingStudents = []
        Object.values(element).filter((val, id) => (Number(val) === 0) && missingStudents.push(students[id]))
        const fullObject = {};

        fullObject[id] = {students: missingStudents, course: subjects[element['Subj']]}
        return fullObject
    });
}