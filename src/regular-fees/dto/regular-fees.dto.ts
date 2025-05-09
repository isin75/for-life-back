import { Type } from 'class-transformer'
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator'

export class ExpenseDto {
  @IsString()
  name: string
  @IsString()
  category: string
  @IsString()
  @IsOptional()
  date?: string
  @IsNumber()
  amount: number
  @IsNumber()
  @IsOptional()
  savedAmount?: number
  frequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'ONE_TIME'
  @IsOptional()
  @IsString()
  deadline?: string
}

export class SavingAccountDto {
  @IsOptional()
  @IsNumber()
  balance?: number
  @IsOptional()
  @IsArray() // Проверка на массив
  @ValidateNested({ each: true }) // Проверка каждого объекта внутри
  @Type(() => Object) // Указывает, что внутри должны быть объекты
  categories?: Record<string, number | string>[]
}

export class TransactionDto {
  @IsNumber()
  amount: number

  type: 'DEPOSIT' | 'WITHDRAWAL'
  @IsOptional()
  @IsString()
  description?: string
}
