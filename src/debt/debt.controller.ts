import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpCode,
  UsePipes,
  ParseFloatPipe
} from '@nestjs/common'
import { DebtService } from './debt.service'
import { DebtDto } from './dto/debt.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @Auth()
  async get(userId: string) {
    return this.debtService.get(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: DebtDto, @CurrentUser('id') userId: string) {
    return this.debtService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async update(
    @Body() dto: DebtDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string
  ) {
    return this.debtService.update(dto, id, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('repayment/:id')
  @Auth()
  async repayment(
    @Body('sum', ParseFloatPipe) sum: number,
    @CurrentUser('id') userId: string,
    @Param('id') id: string
  ) {
    return this.debtService.debtRepayment(sum, id, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('increase/:id')
  @Auth()
  async increase(
    @Body('sum', ParseFloatPipe) sum: number,
    @CurrentUser('id') userId: string,
    @Param('id') id: string
  ) {
    return this.debtService.debtIncrease(sum, id, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.debtService.delete(id)
  }
}
