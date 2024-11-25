import Holidays, * as HolidayDefinition from 'date-holidays'

export function getWorkingHours(year: number, month: number): number {
  const hd = new (HolidayDefinition as any)('PL') as Holidays

  const holidays = hd.getHolidays(year)

  const startDate = new Date(Date.UTC(year, month - 1, 1))
  const endDate = new Date(Date.UTC(year, month, 0))

  let workingDays = 0

  for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
    const isWeekend = day.getDay() === 0 || day.getDay() === 6
    const isHoliday = holidays.some(
      holiday => new Date(holiday.date).toDateString() === day.toDateString()
    )

    if (!isWeekend && !isHoliday) {
      workingDays++
    }
  }

  return workingDays * 8
}
