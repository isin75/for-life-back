import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class DistributionTransferDto {
  @IsString()
  title: string

  @IsNumber()
  sum: number
}

export class DistributionUpdateDto {
  @IsString()
  id: string

  @IsOptional()
  @IsNumber()
  salary?: number

  @IsOptional()
  @IsNumber()
  majorExpenditures?: number

  @IsOptional()
  @IsNumber()
  savingsAndInvestments?: number

  @IsOptional()
  @IsNumber()
  deferredGoals?: number

  @IsOptional()
  @IsNumber()
  entertainmentAndPersonalExpenses?: number

  @IsOptional()
  @IsNumber()
  charityAndGifts?: number

  @IsOptional()
  @IsNumber()
  addInvestmentsOrRepaymentOfDebts?: number
}

export class DistributionSettings {
  @IsNumber()
  majorExpendituresPercent: number

  @IsNumber()
  savingsAndInvestmentsPercent: number

  @IsNumber()
  deferredGoalsPercent: number

  @IsNumber()
  entertainmentAndPersonalExpensesPercent: number

  @IsNumber()
  charityAndGiftsPercent: number

  @IsNumber()
  addInvestmentsOrRepaymentOfDebtsPercent: number

  @IsBoolean()
  onTheFirstGoal: boolean

  @IsBoolean()
  isWeeklyExpenses: boolean
}
