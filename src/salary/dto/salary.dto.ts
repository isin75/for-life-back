import { IsNumber, IsObject, IsOptional } from 'class-validator'
export class SalaryDto {
  @IsOptional()
  @IsNumber()
  hoursWorked?: number

  @IsOptional()
  @IsNumber()
  nightShifts?: number

  @IsOptional()
  @IsNumber()
  year?: number

  @IsOptional()
  @IsNumber()
  month?: number
}

interface IBonuses {
  [key: string]: number
}

export class SalarySettingsDto {
  @IsOptional()
  @IsNumber()
  rateOfPay?: number

  @IsOptional()
  @IsNumber()
  minimumRate?: number

  @IsOptional()
  @IsNumber()
  nightTimeRateOfPay?: number

  @IsOptional()
  @IsObject()
  bonuses?: IBonuses

  @IsOptional()
  @IsNumber()
  taxBenefit?: number

  @IsOptional()
  @IsNumber()
  pensionInsurancePercent?: number

  @IsOptional()
  @IsNumber()
  disabilityInsurancePercent?: number

  @IsOptional()
  @IsNumber()
  sicknessInsurancePercent?: number

  @IsOptional()
  @IsNumber()
  incomeTax?: number

  @IsOptional()
  @IsNumber()
  healthInsurancePercent?: number

  @IsOptional()
  @IsNumber()
  finalTaxBase?: number

  @IsOptional()
  @IsNumber()
  revenueExpenditure?: number

  @IsOptional()
  @IsNumber()
  fourBrigadePercent?: number
}
