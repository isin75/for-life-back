/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { DecGoalsDto, GoalsDto, GoalsSettingsDto } from './dto/goals.dto'
import { DebtService } from 'src/debt/debt.service'

@Injectable()
export class GoalsService {
  constructor(
    private prisma: PrismaService,
    private debtService: DebtService
  ) {}
  //TODO: всего отложено, всего на черный день, не распределено, создание настроек и их изменение и обновление, плюс проверка есть ли они уже и создание при создании первой цели
  async get(userId: string) {
    return await this.prisma.goalsSettings.findMany({
      where: {
        userId
      },
      select: {
        goals: true
      }
    })
  }

  async createSettings(goalsSettingsDto: GoalsSettingsDto, userId: string) {
    const isSettings = await this.prisma.goalsSettings.findFirst({
      where: { userId }
    })

    if (isSettings) {
      throw new Error(`This user already have goals settings`)
    }

    return await this.prisma.goalsSettings.create({
      data: {
        ...goalsSettingsDto,
        userId
      }
    })
  }

  async updateSettings(goalsSettingsDto: GoalsSettingsDto, id: string) {
    return await this.prisma.goalsSettings.update({
      where: { id },
      data: { ...goalsSettingsDto }
    })
  }

  async deletedSetting(id: string) {
    return await this.prisma.goalsSettings.delete({
      where: { id }
    })
  }

  async create(goalsDto: GoalsDto, userId: string) {
    const { id } = await this.prisma.goalsSettings.findFirst({
      where: { userId }
    })
    return await this.prisma.goals.create({
      data: {
        ...goalsDto,
        left: goalsDto.price,
        goalsSettings: {
          connect: {
            id
          }
        }
      }
    })
  }

  async update(goalsDto: GoalsDto, id: string) {
    return await this.prisma.goals.update({
      where: {
        id
      },
      data: goalsDto
    })
  }

  async incAmount(sum: number, id: string, userId: string) {
    const [_, goalData] = await Promise.all([
      this.prisma.goalsSettings.update({
        where: { userId: userId },
        data: {
          totalSave: { increment: sum }
        }
      }),
      this.prisma.goals.findUnique({
        where: { id },
        select: {
          price: true,
          compiled: true
        }
      })
    ])

    if (!goalData) {
      throw new Error('Goal not found')
    }

    const { price, compiled } = goalData
    const newCompiled = compiled + sum
    const percentCompiled = (newCompiled / price) * 100
    const percentOnTarget = 100 - percentCompiled
    const isCompleted = newCompiled >= price

    return await this.prisma.goals.update({
      where: { id },
      data: {
        left: { decrement: sum },
        compiled: newCompiled,
        percentCompiled,
        percentOnTarget,
        isCompleted
      }
    })
  }

  async decAmount(dto: DecGoalsDto, id: string, userId: string) {
    const { sum, isDebt } = dto
    const [_, goalData] = await Promise.all([
      this.prisma.goalsSettings.update({
        where: { userId: userId },
        data: {
          totalSave: { decrement: sum }
        }
      }),
      this.prisma.goals.findUnique({
        where: { id }
      })
    ])

    const { price, compiled, debtId } = goalData

    if (isDebt) {
      if (debtId) {
        return await this.prisma.debt.update({
          where: {
            id: debtId
          },
          data: {
            amount: { increment: sum },
            left: { decrement: sum }
          }
        })
      } else {
        const debtDto = {
          title: `Debt ${goalData.title}`,
          amount: sum,
          goals: goalData.id
        }
        return await this.debtService.create(debtDto, userId)
      }
    }

    const newCompiled = compiled - sum
    const percentCompiled = (newCompiled / price) * 100
    const percentOnTarget = 100 - percentCompiled
    const isCompleted = newCompiled >= price

    return await this.prisma.goals.update({
      where: { id },
      data: {
        left: { increment: sum },
        compiled: newCompiled,
        percentCompiled,
        percentOnTarget,
        isCompleted
      }
    })
  }

  async delete(id: string) {
    return await this.prisma.goals.delete({
      where: { id }
    })
  }
}
