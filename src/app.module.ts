import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { TaskModule } from './task/task.module'
import { TimeBlockModule } from './time-block/time-block.module'
import { PomodoroModule } from './pomodoro/pomodoro.module'
import { SalaryModule } from './salary/salary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    TaskModule,
    TimeBlockModule,
    PomodoroModule,
    SalaryModule
  ]
})
export class AppModule {}
