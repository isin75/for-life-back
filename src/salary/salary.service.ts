import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SalaryDto, SalarySettingsDto } from './dto/salary.dto'
import { createSalary } from './utils/salary.utils'
import { DistributionService } from 'src/distribution/distribution.service'

@Injectable()
export class SalaryService {
  constructor(
    private prisma: PrismaService,
    private distributionService: DistributionService
  ) {}

  async getAll(userId: string) {
    const { id } = await this.prisma.salarySettings.findFirst({
      where: {
        userId
      },
      select: { id: true }
    })

    return await this.prisma.salary.findMany({
      where: {
        salarySettingsId: id
      }
    })
  }

  async getSalary(monthString: string, userId: string) {
    return await this.prisma.salarySettings.findFirst({
      where: {
        userId
      },
      select: {
        salary: {
          where: {
            monthYear: monthString
          }
        }
      }
    })
  }

  async setSettings(dto: SalarySettingsDto, userId: string) {
    const settings = await this.prisma.salarySettings.findFirst({
      where: { userId }
    })

    if (settings) {
      throw new Error(`User with id ${userId} did have salary settings`)
    }

    return await this.prisma.salarySettings.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async create(dto: SalaryDto, userId: string) {
    const { hoursWorked, year, month } = dto
    const monthYear = `${month}.${year}`
    const [settings, isCreated] = await Promise.all([
      this.prisma.salarySettings.findFirst({
        where: { userId }
      }),
      this.prisma.salary.findFirst({
        where: { monthYear }
      })
    ])

    if (!settings) {
      console.log(settings)
      throw new Error(
        `User with id ${console.log(settings)} don't have salary settings`
      )
    }

    if (isCreated) {
      throw new Error(`Salary for ${monthYear} is created`)
    }
    const salaryData = createSalary(settings, dto, monthYear)

    await this.distributionService.create(
      salaryData.salaryNetto,
      monthYear,
      userId
    )

    return this.prisma.salary.create({
      data: {
        ...salaryData,
        hoursWorked,
        salarySettings: {
          connect: {
            id: settings.id
          }
        }
      }
    })
  }

  async update(dto: SalaryDto, salaryId: string) {
    return this.prisma.salary.update({
      where: {
        id: salaryId
      },
      data: dto
    })
  }

  async delete(salaryId: string) {
    return this.prisma.salary.delete({
      where: {
        id: salaryId
      }
    })
  }
}
