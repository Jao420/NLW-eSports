export function convertHourStringToMinutes(hourString: string) {
  const [hours, minute] = hourString.split(':').map(Number)  

  const minutesAmount = (hours * 60) + minute

  return minutesAmount
}
