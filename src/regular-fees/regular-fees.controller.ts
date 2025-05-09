import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { RegularFeesService } from './regular-fees.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ExpenseDto, SavingAccountDto } from './dto/regular-fees.dto'

@Controller('regular-fees')
export class RegularFeesController {
  constructor(private readonly regularFeesService: RegularFeesService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('saving')
  @Auth()
  async createSavingAccount(
    @Body() dto: SavingAccountDto,
    @CurrentUser('id') userId: string
  ) {
    return this.regularFeesService.createSavingAccount(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('saving')
  @Auth()
  async getSavingAccount(@CurrentUser('id') userId: string) {
    return this.regularFeesService.getSavingAccount(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('saving')
  @Auth()
  async updateSavingAccount(
    @Body() dto: SavingAccountDto,
    @CurrentUser('id') userId: string
  ) {
    return this.regularFeesService.updateSavingAccount(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('saving')
  @Auth()
  async clearSavingAccount(@CurrentUser('id') userId: string) {
    return this.regularFeesService.clearSavingAccount(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('expense')
  @Auth()
  async createExpense(
    @Body() dto: ExpenseDto,
    @CurrentUser('id') userId: string
  ) {
    return this.regularFeesService.createExpense(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('expense')
  @Auth()
  async getExpenses(@CurrentUser('id') userId: string) {
    return this.regularFeesService.getExpenses(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('expense/:id')
  @Auth()
  async updateExpenses(@Body() dto: ExpenseDto, @Param('id') id: string) {
    return this.regularFeesService.updateExpenses(dto, id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('expense')
  @Auth()
  async deleteExpenses(@Body() id: string) {
    return this.regularFeesService.deleteExpenses(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createTransaction(@CurrentUser('id') userId: string) {
    return this.regularFeesService.createTransaction(userId)
  }
}
