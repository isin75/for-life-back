import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { RentBreakdownService } from './rent-breakdown.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { RentDto, RentSettingsDto } from './dto/rent-breakdown.dto'

@Controller('rent-breakdown')
export class RentBreakdownController {
  constructor(private readonly rentBreakdownService: RentBreakdownService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async setSettings(
    @Body() dto: RentSettingsDto,
    @CurrentUser('id') userId: string
  ) {
    return this.rentBreakdownService.setSettings(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch()
  @Auth()
  async updateSettings(
    @Body() dto: RentSettingsDto,
    @CurrentUser('id') userId: string
  ) {
    return this.rentBreakdownService.updateSettings(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createRent(@Body() dto: RentDto, @CurrentUser('id') userId: string) {
    return this.rentBreakdownService.createRent(dto, userId)
  }
}
