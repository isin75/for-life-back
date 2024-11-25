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
    TransferFundsModule
  ]
})
export class AppModule {}
