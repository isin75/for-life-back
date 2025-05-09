import { IsNumber, IsOptional, IsString } from 'class-validator'

export class Dto {
  @IsNumber()
  value: number

  @IsString()
  date: string
}

export class RentSettingsDto {
  @IsOptional()
  @IsNumber()
  gasSubscriptionFee
  @IsOptional()
  @IsNumber()
  gasConversionRate
  @IsOptional()
  @IsNumber()
  gasConsumptionPrice
  @IsOptional()
  @IsNumber()
  gasDistributionFixed
  @IsOptional()
  @IsNumber()
  gasDistributiveVariablePrice
  @IsOptional()
  @IsNumber()
  electricKilowattPrice
  @IsOptional()
  @IsNumber()
  electricFixedRate
  @IsOptional()
  @IsNumber()
  electricFixedComponent
  @IsOptional()
  @IsNumber()
  electricTransferFee
  @IsOptional()
  @IsNumber()
  electricQualityRate
  @IsOptional()
  @IsNumber()
  electricNetworkSpeed
  @IsOptional()
  @IsNumber()
  electricOZE
  @IsOptional()
  @IsNumber()
  electricCogenerationFee
  @IsOptional()
  @IsNumber()
  electricSubscriptionRate
}

export class RentDto {
  date: string
  heating: Record<string, number>
  water: Record<string, number>
}
