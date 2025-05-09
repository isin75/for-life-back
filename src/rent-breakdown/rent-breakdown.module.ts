import { Module } from '@nestjs/common'
import { RentBreakdownService } from './rent-breakdown.service'
import { RentBreakdownController } from './rent-breakdown.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [RentBreakdownController],
  providers: [RentBreakdownService, PrismaService],
  exports: [RentBreakdownService]
})
export class RentBreakdownModule {}
