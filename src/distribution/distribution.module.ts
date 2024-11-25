import { Module } from '@nestjs/common'
import { DistributionService } from './distribution.service'
import { DistributionController } from './distribution.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [DistributionController],
  providers: [DistributionService, PrismaService],
  exports: [DistributionService]
})
export class DistributionModule {}
