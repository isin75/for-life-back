import { Module } from '@nestjs/common'
import { GoalsService } from './goals.service'
import { GoalsController } from './goals.controller'
import { PrismaService } from 'src/prisma.service'
import { DebtService } from 'src/debt/debt.service'

@Module({
  controllers: [GoalsController],
  providers: [GoalsService, DebtService, PrismaService]
})
export class GoalsModule {}
