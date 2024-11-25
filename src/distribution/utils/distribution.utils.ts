import { rounding } from 'src/salary/utils/salary.utils'

export function createObjectArray(
  key: number,
  value: number
): { [key: number]: number }[] {
  const objectsArray: { [key: number]: any }[] = []

  for (let i = 1; i <= key; i++) {
    const obj = { [i]: value }
    objectsArray.push(obj)
  }

  return objectsArray
}

export function weeksBetweenDates(date: string): number {
  const [month, year] = date.split('.')
  const startDate = new Date(+year, +month + 1, 10)
  const endDate = new Date(+year, +month + 2, 10)
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const diffInMilliseconds = endDate.getTime() - startDate.getTime()

  const diffInDays = diffInMilliseconds / millisecondsPerDay

  const weeks = Math.floor(diffInDays / 7)

  return weeks
}

export function calculateDistribution(
  settings,
  salary: number,
  monthYear: string
) {
  const {
    majorExpendituresPercent,
    savingsAndInvestmentsPercent,
    deferredGoalsPercent,
    entertainmentAndPersonalExpensesPercent,
    charityAndGiftsPercent,
    addInvestmentsOrRepaymentOfDebtsPercent
  } = settings

  const majorExpenditures = rounding(salary * majorExpendituresPercent)
  const savingsAndInvestments = rounding(salary * savingsAndInvestmentsPercent)
  const deferredGoals = rounding(salary * deferredGoalsPercent)
  const entertainmentAndPersonalExpenses = rounding(
    salary * entertainmentAndPersonalExpensesPercent
  )
  const charityAndGifts = rounding(salary * charityAndGiftsPercent)
  const addInvestmentsOrRepaymentOfDebts = rounding(
    salary * addInvestmentsOrRepaymentOfDebtsPercent
  )

  return {
    total: salary,
    left: salary,
    majorExpenditures,
    savingsAndInvestments,
    deferredGoals,
    entertainmentAndPersonalExpenses,
    charityAndGifts,
    addInvestmentsOrRepaymentOfDebts,
    monthYear
  }
}
