import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'
import { PomodoroSettingsDto } from 'src/pomodoro/dto/pomodoro.dto'

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

  @IsOptional()
  @IsNumber()
  totalDebt?: number
}
