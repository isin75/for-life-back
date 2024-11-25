import { Module } from '@nestjs/common'
import { DebtService } from './debt.service'
import { DebtController } from './debt.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [DebtController],
  providers: [DebtService, PrismaService],
  exports: [DebtService]
})
export class DebtModule {}
