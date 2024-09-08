import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength
} from 'class-validator'

interface IBonuses {
  [key: string]: number
}

export class PomodoroSettingsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  workInterval?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  breakInterval?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  intervalsCount?: number
}

export class SalarySettingsDto {
  @IsOptional()
  @IsNumber()
  rateOfPay?: number

  @IsOptional()
  @IsNumber()
  nightTimeRateOfPay?: number

  @IsOptional()
  @IsArray()
  bonuses?: IBonuses[]

  @IsOptional()
  @IsNumber()
  taxBenefit?: number

  @IsOptional()
  @IsNumber()
  pensionInsurance?: number

  @IsOptional()
  @IsNumber()
  disabilityInsurance?: number

  @IsOptional()
  @IsNumber()
  sicknessInsurance?: number

  @IsOptional()
  @IsNumber()
  incomeTax?: number

  @IsOptional()
  @IsNumber()
  healthInsurance?: number

  @IsOptional()
  @IsNumber()
  finalTaxBase?: number

  @IsOptional()
  @IsNumber()
  revenueExpenditure?: number
}

export class UserDto extends PomodoroSettingsDto {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  name: string

  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  @IsOptional()
  @IsString()
  password: string
}
