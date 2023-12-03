export function getStartAndEndDateOfWeek() {
  const curr = new Date(); // get current date
  const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  const last = first + 6; // last day is the first day + 6

  const firstday = new Date(curr.setDate(first));
  const lastday = new Date(curr.setDate(last));
  return {
    startDate: firstday.toISOString().split('T')[0],
    endDate: lastday.toISOString().split('T')[0],
  };
}
