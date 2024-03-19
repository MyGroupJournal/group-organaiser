export default function isWeekPast(startDate) {
  const today = new Date();

  const differenceInDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  return differenceInDays >= 7;
}