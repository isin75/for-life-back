import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { TaskModule } from './task/task.module'
import { TimeBlockModule } from './time-block/time-block.module'
import { PomodoroModule } from './pomodoro/pomodoro.module'
import { SalaryModule } from './salary/salary.module'
import { DistributionModule } from './distribution/distribution.module'
import { GoalsModule } from './goals/goals.module'
import { DebtModule } from './debt/debt.module'
import { TransferFundsModule } from './transfer-funds/transfer-funds.module'
import { RentBreakdownModule } from './rent-breakdown/rent-breakdown.module'
import { RegularFeesModule } from './regular-fees/regular-fees.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    TaskModule,
    TimeBlockModule,
    PomodoroModule,
    SalaryModule,
    DistributionModule,
    GoalsModule,
    DebtModule,
    TransferFundsModule,
    RentBreakdownModule,
    RegularFeesModule
  ]
})
export class AppModule {}
