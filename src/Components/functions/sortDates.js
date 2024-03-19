export default function sortDates(data) {
    function quickSort(arr) {
            if (arr.length <= 1) return arr;
            const pivot = arr[0];
            const left = [];
            const right = [];
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] < pivot) left.push(arr[i]);
                else right.push(arr[i]);
            }
            return [...quickSort(left), pivot, ...quickSort(right)];
        }

        let tempArray = []
        data.forEach(months => {
            months.forEach(element => {
                let date = element['Дата']
                let month = element['Дата'].split('.')[1]
                if (!tempArray[month]) tempArray[month] = []
                tempArray[month].push(date);
            })
        })
        let uniqArray = []
        for (let i = 0; i < Object.values(tempArray).length; i++) {
            let month = Object.values(tempArray)[i]
            month = month.map(day => Number(day.split('.')[0]))
            if (month.length >= 1) {
                uniqArray.push(Array.from(new Set(month)));
            }
        }
        let sortedArr = uniqArray.map(element => quickSort(element))
        return sortedArr.map((element, id) => element.map(day => `${day.toString().padStart(2, '0')}.${(id + 1).toString().padStart(2, '0')}.2024`))
}