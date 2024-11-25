import { Module } from '@nestjs/common'
import { SalaryService } from './salary.service'
import { SalaryController } from './salary.controller'
import { PrismaService } from 'src/prisma.service'
import { DistributionService } from 'src/distribution/distribution.service'

@Module({
  controllers: [SalaryController],
  providers: [SalaryService, PrismaService, DistributionService],
  exports: [SalaryService]
})
export class SalaryModule {}
