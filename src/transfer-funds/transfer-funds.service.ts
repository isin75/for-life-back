import { Injectable } from '@nestjs/common'
import { DebtService } from 'src/debt/debt.service'
import { DistributionService } from 'src/distribution/distribution.service'
import { GoalsService } from 'src/goals/goals.service'
import { PrismaService } from 'src/prisma.service'
import { TransferDto } from './dto/transfer-funds.dto'

@Injectable()
export class TransferFundsService {
  constructor(
    private prisma: PrismaService,
    private distributionService: DistributionService,
    private goalsService: GoalsService,
    private debtService: DebtService
  ) {}

  async transferFunds(userId: string, dto: TransferDto) {
    const {
      fromCategory,
      toCategory,
      fromId,
      toId,
      amount,
      distributionCategoryFrom,
      distributionCategoryTo,
      isDebt
    } = dto
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        distributeSettings: {
          include: { DistributeSalary: true }
        },
        goalsSettings: {
          include: { goals: true }
        },
        debt: true
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const { distributeSettings, goalsSettings, debt } = user

    const goals = goalsSettings[0]?.goals || []

    const debtId = goals.find(g => g.id === fromId)?.debtId

    // Check the available funds in the selected category
    let availableFunds = 0

    switch (fromCategory) {
      case 'distribution':
        availableFunds = distributeSettings[0].DistributeSalary.filter(
          d => d.id === fromId
        )[distributionCategoryFrom]

        break
      case 'goal':
        if (isDebt && debtId) {
          const { left } = await this.prisma.debt.findUnique({
            where: { id: debtId }
          })
          availableFunds = goals.find(g => g.id === fromId).compiled - left
        } else {
          availableFunds = goals.find(g => g.id === fromId).compiled
        }
        break
      case 'debt':
        availableFunds = debt.find(g => g.id === fromId).refundedAmount
        break
    }

    // If there are insufficient funds, throw an error
    if (availableFunds < amount) {
      throw new Error('Insufficient funds in selected category')
    }
    const dtoFrom = { title: distributionCategoryFrom, sum: amount }
    const dtoTo = { title: distributionCategoryTo, sum: amount }
    // Reduce funds in the source category
    let from
    let to
    switch (fromCategory) {
      case 'distribution':
        from = await this.distributionService.decAmount(dtoFrom, fromId)
        break
      case 'goal':
        from = await this.goalsService.decAmount(
          { sum: amount, isDebt },
          fromId,
          userId
        )
        break
      case 'debt':
        from = await this.debtService.debtIncrease(amount, fromId, userId)
        break
    }

    // Adding funds to the target category
    switch (toCategory) {
      case 'distribution':
        to = await this.distributionService.incAmount(dtoTo, toId)
        break
      case 'goal':
        to = await this.goalsService.incAmount(amount, toId, userId)
        break
      case 'debt':
        to = await this.debtService.debtRepayment(amount, toId, userId)
        break
    }
    const result = { from, to }
    return result
  }
}
