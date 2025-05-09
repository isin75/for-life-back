/* eslint-disable @typescript-eslint/no-unused-vars */
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
  monthYear: string,
  expenses: any[]
) {
  const {
    majorExpendituresPercent,
    savingsAndInvestmentsPercent,
    deferredGoalsPercent,
    entertainmentAndPersonalExpensesPercent,
    charityAndGiftsPercent,
    addInvestmentsOrRepaymentOfDebtsPercent
  } = settings

  const { sum, expensesArray } = calculateExpenses(expenses, monthYear)
  console.log(rounding(salary * majorExpendituresPercent), sum)

  const majorExpenditures = rounding(salary * majorExpendituresPercent) - sum
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
    monthYear,
    sum,
    expenses: expensesArray
  }
}

function calculateMonth(mm, yy, monthYear: string): number {
  const [month, year] = monthYear.split('.')

  const dif = (+yy - +year) * 12 + (+mm - +month)
  return dif
}

export function calculateExpenses(expenses, monthYear: string) {
  let sum: number = 0

  for (const expense of expenses) {
    console.log('expense', expense)
    if (expense.frequency === 'MONTHLY') {
      sum += +expense.amount
    } else {
      if (!expense.savedPrefMonth) {
        const [mm, yy] = expense.deadline.split('.')
        const months = calculateMonth(mm, yy, monthYear)
        // console.log('months', months)

        const savedPrefMonth = +expense.amount / +months
        // console.log(
        //   'savedPrefMonth',
        //   savedPrefMonth,
        //   'expense.amount',
        //   expense.amount
        // )

        if (!expense.savedPrefMonth >= expense.amount) {
          expense.savedPrefMonth = savedPrefMonth
          expense.savedAmount += savedPrefMonth
          // console.log('savedAmount', expense.savedAmount)

          sum += +savedPrefMonth
        }
      }
    }
  }
  console.log('sum', sum)

  return { sum, expensesArray: expenses }
}
