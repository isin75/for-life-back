import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import {
  calculateDistribution,
  createObjectArray,
  weeksBetweenDates
} from './utils/distribution.utils'
import {
  DistributionSettings,
  DistributionTransferDto,
  DistributionUpdateDto
} from './dto/distribution.dto'

@Injectable()
export class DistributionService {
  constructor(private prisma: PrismaService) {}
  //TODO: перенос остатков денег на цели, с возможностью потом их распределять, всего денег распределено и осталось

  async setSettings(dto: DistributionSettings, userId: string) {
    const settings = await this.prisma.distributeSettings.findFirst({
      where: { userId }
    })

    if (settings) {
      throw new Error(`User with id: ${userId}, already have settings`)
    }

    return await this.prisma.distributeSettings.create({
      data: { ...dto, userId }
    })
  }

  async updateSettings(dto: DistributionSettings, userId: string) {
    const settings = await this.prisma.distributeSettings.findFirst({
      where: { userId }
    })

    if (!settings.id) {
      throw new Error(`User with id: ${userId}, haven't settings`)
    }

    return await this.prisma.distributeSettings.update({
      where: { id: settings.id },
      data: { ...dto, userId }
    })
  }

  async getDistribution(monthYear: string, userId: string) {
    return await this.prisma.distributeSettings.findFirst({
      where: { userId },
      select: {
        DistributeSalary: {
          where: { monthYear }
        }
      }
    })
  }
  async getAll(userId: string) {
    const { id } = await this.prisma.distributeSettings.findFirst({
      where: { userId },
      select: { id: true }
    })

    return await this.prisma.distributeSalary.findMany({
      where: { distributeSettingsId: id }
    })
  }

  async create(salary: number, monthYear: string, userId: string) {
    const settings = await this.prisma.distributeSettings.findFirst({
      where: { userId }
    })

    if (!settings) {
      throw new Error(`User settings with id ${userId} not found`)
    }

    const distributionData = calculateDistribution(settings, salary, monthYear)
    console.log(distributionData)

    if (settings.isWeeklyExpenses) {
      const weeks = weeksBetweenDates(monthYear)
      const moneyPrefWeek = distributionData.majorExpenditures / weeks
      const weeklyExpenses = createObjectArray(weeks, moneyPrefWeek)

      return await this.prisma.distributeSalary.create({
        data: {
          ...distributionData,
          weeklyExpenses,
          distributeSettings: {
            connect: {
              id: settings.id
            }
          }
        }
      })
    }

    return await this.prisma.distributeSalary.create({
      data: {
        ...distributionData,
        distributeSettings: {
          connect: {
            id: settings.id
          }
        }
      }
    })
  }

  async update(dto: DistributionUpdateDto, monthYear: string, userId: string) {
    const settings = await this.prisma.distributeSettings.findFirst({
      where: { userId }
    })
    const { id, salary } = dto

    if (!settings) {
      throw new Error(`User settings with id ${userId} not found`)
    }

    const distributionData = salary
      ? calculateDistribution(settings, dto.salary, monthYear)
      : dto

    return await this.prisma.distributeSalary.update({
      where: {
        id
      },
      data: distributionData
    })
  }

  async incAmount(dto: DistributionTransferDto, id: string) {
    return await this.prisma.distributeSalary.update({
      where: { id },
      data: {
        left: { increment: dto.sum },
        [dto.title]: { increment: dto.sum }
      }
    })
  }

  async decAmount(dto: DistributionTransferDto, id: string) {
    return await this.prisma.distributeSalary.update({
      where: { id },
      data: {
        left: { decrement: dto.sum },
        [dto.title]: { decrement: dto.sum }
      }
    })
  }

  async delete(distributeId: string) {
    return await this.prisma.distributeSalary.delete({
      where: { id: distributeId }
    })
  }
}
