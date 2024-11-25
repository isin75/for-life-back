import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class TransferDto {
  @IsString()
  fromCategory: 'distribution' | 'goal' | 'debt'

  @IsString()
  toCategory: 'distribution' | 'goal' | 'debt'

  @IsString()
  fromId: string

  @IsString()
  toId: string

  @IsNumber()
  amount: number

  @IsBoolean()
  isDebt: boolean

  @IsString()
  @IsOptional()
  distributionCategoryFrom?: string

  @IsString()
  @IsOptional()
  distributionCategoryTo?: string
}
