export function restDates(dates: Date[])
{
  return dates.reduce((previousValue, date) => Math.abs(previousValue - date))
}

export function msToTime(duration: number)
{
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  const sHours = (hours < 10) ? '0' + hours : hours
  const sMinutes = (minutes < 10) ? '0' + minutes : minutes
  const sSeconds = (seconds < 10) ? '0' + seconds : seconds

  return sHours + ':' + sMinutes + ':' + sSeconds
}

export function isSameDay(first: Date, second: Date)
{
  return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate()
}