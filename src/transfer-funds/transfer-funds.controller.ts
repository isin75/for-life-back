import {
  Body,
  Controller,
  HttpCode,
  Patch,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { TransferFundsService } from './transfer-funds.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { TransferDto } from './dto/transfer-funds.dto'

@Controller('transfer-funds')
export class TransferFundsController {
  constructor(private readonly transferFundsService: TransferFundsService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch()
  @Auth()
  async transferFunds(
    @CurrentUser('id') userId: string,
    @Body() dto: TransferDto
  ) {
    return this.transferFundsService.transferFunds(userId, dto)
  }
}
