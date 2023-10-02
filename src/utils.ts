import { type MONTHS } from './consts'

export function formatDate (inputDate: string, monthsEnum: typeof MONTHS): Array<string | number> {
  const [, monthIndex, day] = inputDate.split('-').map(Number)
  const monthName: string = monthsEnum[monthIndex]

  return [day, monthName]
}
