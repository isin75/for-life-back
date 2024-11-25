import { Module } from '@nestjs/common'
import { TransferFundsService } from './transfer-funds.service'
import { TransferFundsController } from './transfer-funds.controller'
import { PrismaService } from 'src/prisma.service'
import { DistributionService } from 'src/distribution/distribution.service'
import { GoalsService } from 'src/goals/goals.service'
import { DebtService } from 'src/debt/debt.service'

@Module({
  controllers: [TransferFundsController],
  providers: [
    TransferFundsService,
    PrismaService,
    DistributionService,
    GoalsService,
    DebtService
  ],
  exports: [TransferFundsService]
})
export class TransferFundsModule {}
