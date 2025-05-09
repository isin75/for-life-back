import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Dto, RentDto, RentSettingsDto } from './dto/rent-breakdown.dto'

@Injectable()
export class RentBreakdownService {
  constructor(private prisma: PrismaService) {}

  async setSettings(dto: RentSettingsDto, userId: string) {
    const isSettings = await this.prisma.rentSettings.findFirst({
      where: { userId }
    })

    if (isSettings) {
      throw new Error('This user already has rent settings')
    }
    try {
      return await this.prisma.rentSettings.create({
        data: {
          ...dto,
          user: {
            connect: {
              id: userId
            }
          }
        }
      })
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  async updateSettings(dto: RentSettingsDto, userId: string) {
    const settings = await this.prisma.rentSettings.findFirst({
      where: { userId }
    })
    return await this.prisma.rentSettings.update({
      where: {
        id: settings.id
      },
      data: dto
    })
  }

  async createGas(dto: Dto, userId: string) {
    const { value, date } = dto
    const {
      gasSubscriptionFee,
      gasConversionRate,
      gasConsumptionPrice,
      gasDistributionFixed,
      gasDistributiveVariablePrice,
      id
    } = await this.prisma.rentSettings.findFirst({
      where: {
        userId
      }
    })

    const pastValue = await this.prisma.gas.findFirst({
      where: {
        date
      }
    })
    const gasConsumption = value - pastValue.value
    const kWh = Math.floor(gasConsumption * gasConversionRate)
    const gasFuel = Math.floor(kWh * gasConsumptionPrice)
    const distributiveVariable = Math.floor(kWh * gasDistributiveVariablePrice)
    const gasPrice =
      (gasSubscriptionFee +
        gasDistributionFixed +
        gasFuel +
        distributiveVariable) *
      0.23

    try {
      return await this.prisma.gas.create({
        data: {
          date,
          gasPrice,
          gasConsumption,
          value,
          rentSettings: {
            connect: {
              id
            }
          }
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }
  async createElectric(dto: Dto, userId: string) {
    const { value, date } = dto
    const {
      electricKilowattPrice,
      electricFixedRate,
      electricFixedComponent,
      electricTransferFee,
      electricQualityRate,
      electricNetworkSpeed,
      electricOZE,
      electricCogenerationFee,
      electricSubscriptionRate,
      id
    } = await this.prisma.rentSettings.findFirst({
      where: {
        userId
      }
    })
    const pastValue = await this.prisma.electric.findFirst({
      where: {
        date
      }
    })
    const electricConsumption = value - pastValue.value
    const energyPurchase = parseFloat(
      Math.round(electricKilowattPrice * electricConsumption).toFixed(2) +
        electricFixedRate
    )

    const electricPrice = parseFloat(
      energyPurchase +
        electricFixedComponent +
        electricTransferFee +
        Math.round(electricQualityRate * electricConsumption).toFixed(2) +
        Math.round(electricNetworkSpeed * electricConsumption).toFixed(2) +
        Math.round(electricOZE * electricConsumption).toFixed(2) +
        Math.round(electricCogenerationFee * electricConsumption).toFixed(2) +
        electricSubscriptionRate
    )

    try {
      return this.prisma.electric.create({
        data: {
          ...dto,
          electricConsumption,
          electricPrice,
          rentSettings: {
            connect: {
              id
            }
          }
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async createRent(dto: RentDto, userId: string) {
    const { id } = await this.prisma.rentSettings.findFirst({
      where: {
        userId
      }
    })
    try {
      return await this.prisma.rent.create({
        data: {
          ...dto,
          rentSettings: {
            connect: {
              id
            }
          }
        }
      })
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
