import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator'

export class PomodoroSessionDto {
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean
}

export class PomodoroRoundDto {
  @IsNumber()
  totalSeconds: number

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean
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
