import axios from 'axios'
import { Employee, Track } from '../interfaces'
import { isSameDay, milisecondsToStringTime, diffMiliseconds } from './dates'

const urlServer = <string>import.meta.env.VITE_BASE_URL_SERVER
const bearer = <string>import.meta.env.VITE_TOKEN_BEARER
const config = { headers: { 'Authorization': 'Bearer ' + bearer } }

export async function getDataEmployee(employeeId: string): Promise<Employee| null>
{
  const endPoint = 'work-entries'

  let employee: Employee | null = null
  try
  {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const resp = await axios.get(urlServer + endPoint, config)
      employee = getEmployeeInfo(employeeId, today, resp.data.data)
  }
  catch (err)
  {
      // Handle Error Here
      console.error(err)
  }

  return employee
}

export async function clockIn(employeeId: string): Promise<Employee| null>
{
  const endPoint = 'work-entries/clock-in'
  return setClock(employeeId, endPoint)
}

export async function clockOut(employeeId: string): Promise<Employee| null>
{
  const endPoint = 'work-entries/clock-out'
  return setClock(employeeId, endPoint)
}

export async function setClock(employeeId: string, endPoint: string): Promise<Employee| null>
{
  const params = { employeeId }

  try
  {
      await axios.post(urlServer + endPoint, params, config)
  }
  catch (err)
  {
      // Handle Error Here
      console.error(err)
  }

  return getDataEmployee(employeeId)
}

function getMaxTime()
{
  const horas = 8
  const mHoras = 1000 * 60 * 60 * horas
  const timeStart = new Date()
  const timeEnd = new Date(timeStart.getTime() + mHoras)

  const maxTimeMili = diffMiliseconds(timeEnd, timeStart)
  const maxTime = milisecondsToStringTime(maxTimeMili)

  return maxTime
}

function getEmployeeInfo(id: string, date: Date, tracks: Track[]): Employee | null
{
  const dataEmployee = tracks.filter(x =>
  {
    const workEntryIn = new Date(x.workEntryIn.date)
    return x.employee.id === id && isSameDay(date, workEntryIn)
  })

  const employee = dataEmployee.length > 0 ? dataEmployee[ 0 ].employee : null

  if (!employee) return null

  const mAcumulado = dataEmployee.reduce((previousValue: number, track: Track) =>
  {
    const workEntryIn = new Date(track.workEntryIn.date)
    const workEntryOut = track.workEntryOut ? new Date(track.workEntryOut.date) : new Date()
    return previousValue + diffMiliseconds(workEntryOut, workEntryIn)
  }, 0)

  employee.totalWorkTime = new Date(date.getTime() + mAcumulado)
  employee.maxWorkTime = getMaxTime()

  employee.imageProfileURL = employee.imageProfileURL || 'https://randomuser.me/api/portraits/men/81.jpg'

  return employee
}