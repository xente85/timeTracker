import axios from 'axios'
import { isSameDay, msToTime, restDates } from './dates'

const bearer = '16e2f0694a311151c01aa0a131b94a5a3ad7f110e12c2d8f459fcbb158214f5f'
const urlServer = 'https://api-test.sesametime.com/schedule/v1/'
const config = { headers: { 'Authorization': 'Bearer ' + bearer } }

export async function getData(id: string): Promise<{ timer: Date | null, active: boolean, maxTime: string }>
{
  console.log('getData', id)
  const endPoint = 'work-entries'

  let timer: Date | null = null
  let active = false
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  try
  {
      const resp = await axios.get(urlServer + endPoint, config)
      const dataEmployee = getEmployeeTimer(id, today, resp.data.data)
      timer = dataEmployee.timer
      active = dataEmployee.active
  }
  catch (err)
  {
      // Handle Error Here
      console.error(err)
  }

  return { timer, active, maxTime: getMaxTime() }
}

export async function clockIn(id: string): Promise<{ timer: Date | null, active: boolean, maxTime: string }>
{
  return setClock(id, 'work-entries/clock-in')
}

export async function clockOut(id: string): Promise<{ timer: Date | null, active: boolean, maxTime: string }>
{
  return setClock(id, 'work-entries/clock-out')
}

export async function setClock(id: string, endPoint: string): Promise<{ timer: Date | null, active: boolean, maxTime: string }>
{
  const params = { employeeId: id }

  try
  {
      await axios.post(urlServer + endPoint, params, config)
  }
  catch (err)
  {
      // Handle Error Here
      console.error(err)
  }

  return getData(id)
}

function getMaxTime()
{
  const horas = 8
  const mHoras = 1000 * 60 * 60 * horas
  const timeStart = new Date()
  const timeEnd = new Date(timeStart.getTime() + mHoras)

  const maxTimeMili = restDates([timeStart, timeEnd])
  const maxTime = msToTime(maxTimeMili)

  return maxTime
}

function getEmployeeTimer(id: string, date: Date, data: any)
{
  console.log('getEmployeeTimer', { id, date, data })

  const dataEmployee = data.filter(x =>
  {
    const workEntryIn = new Date(x.workEntryIn.date)
    return x.employee.id === id && isSameDay(date, workEntryIn)
  })

  const active = dataEmployee.length > 0 ? dataEmployee[ 0 ].employee.workStatus === 'online' : false

  const mAcumulado = dataEmployee.reduce((previousValue, track) =>
  {
    const workEntryIn = new Date(track.workEntryIn.date)
    const workEntryOut = track.workEntryOut ? new Date(track.workEntryOut.date) : new Date()
    return previousValue + restDates([workEntryOut, workEntryIn])
  }, 0)

  const timer = new Date(date.getTime() + mAcumulado)

  return { active, timer }
}