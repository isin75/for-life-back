import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { DebtDto } from './dto/debt.dto'

@Injectable()
export class DebtService {
  constructor(private prisma: PrismaService) {}

  async get(userId: string) {
    return await this.prisma.debt.findMany({
      where: {
        userId
      }
    })
  }

  async create(debtDto: DebtDto, userId: string) {
    const { amount } = debtDto
    const { totalDebt } = await this.prisma.user.findFirst({
      where: { id: userId }
    })

    const addDebt = totalDebt + amount
    const left = amount

    await this.prisma.user.update({
      where: { id: userId },
      data: { totalDebt: addDebt }
    })

    const { goals, ...dto } = debtDto
    return await this.prisma.debt.create({
      data: {
        ...dto,
        left,
        user: {
          connect: {
            id: userId
          }
        },
        ...(goals && {
          goals: {
            connect: { id: goals }
          }
        })
      }
    })
  }

  async update(debtDto: DebtDto, id: string, userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { goals, ...data } = debtDto
    return await this.prisma.debt.update({
      where: {
        id,
        userId
      },
      data: { ...data }
    })
  }

  async debtRepayment(sum: number, id: string, userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalDebt: { decrement: sum }
      }
    })

    const { refundedAmount, amount } = await this.prisma.debt.findUnique({
      where: { id }
    })

    const refAmount = sum + refundedAmount
    const isCompleted = amount <= refAmount
    const amountLeft = amount - refAmount

    return await this.prisma.debt.update({
      where: {
        id,
        userId
      },
      data: { refundedAmount: refAmount, left: amountLeft, isCompleted }
    })
  }

  async debtIncrease(sum: number, id: string, userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { totalDebt: { increment: sum } }
    })

    const { amount, refundedAmount } = await this.prisma.debt.findUnique({
      where: { id }
    })

    const increase = sum + amount

    const amountLeft = increase - refundedAmount
    return await this.prisma.debt.update({
      where: {
        id,
        userId
      },
      data: { amount: increase, left: amountLeft }
    })
  }

  async delete(id: string) {
    return await this.prisma.debt.delete({
      where: { id }
    })
  }
}
