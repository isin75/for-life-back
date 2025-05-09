import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ExpenseDto, SavingAccountDto } from './dto/regular-fees.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class RegularFeesService {
  constructor(private prisma: PrismaService) {}
  async createSavingAccount(dto: SavingAccountDto, userId: string) {
    const isSavingAccount = await this.prisma.savingAccount.findFirst({
      where: { userId }
    })
    if (isSavingAccount) {
      throw new Error('This user already has a SavingAccount')
    }
    try {
      return await this.prisma.savingAccount.create({
        data: {
          ...dto,
          user: { connect: { id: userId } },
          categories: dto.categories ? (dto.categories as Prisma.JsonArray) : []
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getSavingAccount(userId: string) {
    return await this.prisma.savingAccount.findFirst({
      where: { userId }
    })
  }

  async updateSavingAccount(dto: SavingAccountDto, userId: string) {
    try {
      return await this.prisma.savingAccount.update({
        where: { userId },
        data: {
          ...dto,
          categories: dto.categories
            ? ((Array.isArray(dto.categories)
                ? dto.categories
                : [dto.categories]) as Prisma.JsonArray)
            : []
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async clearSavingAccount(userId: string) {
    try {
      return await this.prisma.savingAccount.delete({
        where: { userId }
      })
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async createExpense(dto: ExpenseDto, userId: string) {
    const { id } = await this.prisma.salary.findFirst({
      where: { monthYear: dto.date }
    })
    let monthsLeft = 1

    if (dto.deadline) {
      const now = new Date()
      const deadline = new Date(dto.deadline)

      // Підраховуємо, скільки місяців залишилося
      monthsLeft = Math.max(
        1,
        (deadline.getFullYear() - now.getFullYear()) * 12 +
          (deadline.getMonth() - now.getMonth())
      )
      const monthlyContribution = dto.amount / monthsLeft
      dto.amount = monthlyContribution
    }
    try {
      return this.prisma.expense.create({
        data: {
          ...dto,
          userId,
          salary: { connect: { id } }
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getExpenses(userId: string) {
    try {
      return await this.prisma.expense.findMany({
        where: { userId }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateExpenses(dto: ExpenseDto, id: string) {
    try {
      return await this.prisma.expense.update({
        where: { id },
        data: { ...dto }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteExpenses(id: string) {
    try {
      return await this.prisma.expense.delete({
        where: { id }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async createTransaction(userId: string) {
    const expenses = await this.prisma.expense.findMany({
      where: { userId }
    })

    // Фільтруємо витрати, де savedAmount < amount
    const filteredExpenses = expenses.filter(
      expense =>
        expense.savedAmount === null || expense.savedAmount < expense.amount
    )

    return filteredExpenses
  }
}
