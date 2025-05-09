import { Module } from '@nestjs/common'
import { RegularFeesService } from './regular-fees.service'
import { RegularFeesController } from './regular-fees.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [RegularFeesController],
  providers: [RegularFeesService, PrismaService],
  exports: [RegularFeesService]
})
export class RegularFeesModule {}
