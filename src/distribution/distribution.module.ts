import { Module } from '@nestjs/common'
import { DistributionService } from './distribution.service'
import { DistributionController } from './distribution.controller'
import { PrismaService } from 'src/prisma.service'
import { RegularFeesService } from 'src/regular-fees/regular-fees.service'

@Module({
  controllers: [DistributionController],
  providers: [DistributionService, PrismaService, RegularFeesService],
  exports: [DistributionService]
})
export class DistributionModule {}
