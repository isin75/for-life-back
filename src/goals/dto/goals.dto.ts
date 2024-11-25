import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class GoalsDto {
  @IsString()
  title: string

  @IsString()
  link: string

  @IsNumber()
  price: number

  @IsNumber()
  @IsOptional()
  compiled: number

  @IsNumber()
  @IsOptional()
  percentOnTarget?: number

  @IsNumber()
  @IsOptional()
  order: number

  @IsBoolean()
  isCompleted: boolean

  // @IsOptional()
  // @IsString()
  // debtId?: string
}

export class GoalsSettingsDto {
  @IsOptional()
  @IsNumber()
  totalSave?: number

  @IsOptional()
  @IsNumber()
  forARainyDay?: number

  @IsOptional()
  @IsNumber()
  undistributed?: number
}

export class DecGoalsDto {
  @IsNumber()
  sum: number

  @IsBoolean()
  isDebt: boolean
}
