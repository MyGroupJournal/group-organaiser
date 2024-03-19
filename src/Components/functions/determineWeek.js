export default function determineWeek(date) {
  if (!date) date = new Date();
  else date = new Date(date);

  let firstDateOfYear = new Date(date.getFullYear(), 0, 1);
  let difference = date - firstDateOfYear;
  let weekNumber = Math.ceil((difference + 1) / (1000 * 60 * 60 * 24 * 7));

  return (weekNumber % 2 !== 0) ? 1 : 2;
}
