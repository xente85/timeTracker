export function diffMiliseconds(date1: Date, date2: Date)
{
  return date1.getTime() - date2.getTime()
}

export function milisecondsToStringTime(duration: number)
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