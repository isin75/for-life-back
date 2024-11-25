import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class DebtDto {
  @IsString()
  title: string

  @IsNumber()
  amount: number

  @IsNumber()
  @IsOptional()
  refundedAmount?: number

  @IsNumber()
  @IsOptional()
  order?: number

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean

  @IsString()
  @IsOptional()
  goals?: string
}
