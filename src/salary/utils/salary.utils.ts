import { getWorkingHours } from 'src/utils/getWorkingHours'
import { SalaryDto } from '../dto/salary.dto'

export function rounding(value: number): number {
  return parseFloat(value.toFixed(2))
}

export function getNightShiftExtraPay(
  nightHours: number,
  minimumRate: number,
  getWorkingHours: number,
  nightRateOfPay: number
): number {
  return (
    (rounding(minimumRate / getWorkingHours) / 100) *
    nightRateOfPay *
    nightHours
  )
}

export function getPercentOf(value: number): number {
  return value / 100
}

export function getBonusSum(bonuses: { [key: string]: number }): number {
  return Object.values(bonuses).reduce(
    (acc: number, it: number): number => acc + it,
    0
  )
}

interface Bonuses {
  [key: string]: number
}

export function createSalary(settings, dto: SalaryDto, monthYear: string) {
  const { hoursWorked, nightShifts, year, month } = dto
  const {
    bonuses,
    rateOfPay,
    minimumRate,
    fourBrigadePercent,
    nightTimeRateOfPay,
    taxBenefit,
    pensionInsurancePercent,
    disabilityInsurancePercent,
    sicknessInsurancePercent,
    incomeTaxPercent,
    healthInsurancePercent,
    revenueExpenditure
  } = settings

  const workingHoursInMonth = getWorkingHours(year, month)
  // const overtimePay =
  //   workingHoursInMonth < hoursWorked
  //     ? (hoursWorked - workingHoursInMonth) * rateOfPay
  //     : 0

  //Hours pay
  const shiftPay = hoursWorked * rateOfPay

  //Is required to calculate extra pay for night shifts
  const nightHours = nightShifts * 8
  const nightShiftExtraPay = rounding(
    getNightShiftExtraPay(
      nightHours,
      minimumRate,
      workingHoursInMonth,
      nightTimeRateOfPay
    )
  )

  const fourBrigadeExtraPay =
    Math.floor(getPercentOf(shiftPay) * fourBrigadePercent * 100) / 100

  const salaryGross = rounding(
    shiftPay +
      nightShiftExtraPay +
      getBonusSum(bonuses as Bonuses) +
      fourBrigadeExtraPay
  )
  //Social security contributions
  const pensionInsurance = rounding(
    salaryGross * getPercentOf(pensionInsurancePercent)
  )
  const disabilityInsurance = rounding(
    salaryGross * getPercentOf(disabilityInsurancePercent)
  )
  const sicknessInsurance = rounding(
    salaryGross * getPercentOf(sicknessInsurancePercent)
  )
  const socialInsuranceTotal = rounding(
    pensionInsurance + disabilityInsurance + sicknessInsurance
  )

  const finalTaxBase = salaryGross - socialInsuranceTotal

  //revenueExpenditure - tax expense on income(250 pln)
  //income - income tax
  const incomeTax = rounding(
    Math.floor(
      Math.floor(
        (finalTaxBase - revenueExpenditure) * getPercentOf(incomeTaxPercent)
      ) - taxBenefit
    )
  )

  //Health insurance contributions
  const healthInsurance = rounding(
    finalTaxBase * getPercentOf(healthInsurancePercent)
  )

  //All taxes
  const taxes = rounding(healthInsurance + socialInsuranceTotal + incomeTax)

  const salaryNetto = rounding(salaryGross - taxes)

  return {
    hoursWorked,
    finalTaxBase,
    healthInsurance,
    incomeTax,
    socialInsuranceTotal,
    sicknessInsurance,
    disabilityInsurance,
    pensionInsurance,
    salaryNetto,
    salaryGross,
    nightHours,
    monthYear
  }
}
