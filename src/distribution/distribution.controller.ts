import {
  Controller,
  Get,
  Param,
  ValidationPipe,
  UsePipes,
  HttpCode,
  Delete,
  Post,
  Body,
  ParseFloatPipe,
  Patch
} from '@nestjs/common'
import { DistributionService } from './distribution.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import {
  DistributionSettings,
  DistributionTransferDto,
  DistributionUpdateDto
} from './dto/distribution.dto'

@Controller('distribution/')
export class DistributionController {
  constructor(private readonly distributionService: DistributionService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(':monthYear')
  @Auth()
  async getDistribution(
    @Param('monthYear') monthYear: string,
    @CurrentUser('id') userId: string
  ) {
    return this.distributionService.getDistribution(monthYear, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('settings')
  @Auth()
  async setSettings(
    @CurrentUser('id') userId: string,
    @Body() dto: DistributionSettings
  ) {
    return await this.distributionService.setSettings(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('settings')
  @Auth()
  async updateSettings(
    @CurrentUser('id') userId: string,
    @Body() dto: DistributionSettings
  ) {
    return await this.distributionService.updateSettings(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.distributionService.getAll(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post(':monthYear')
  @Auth()
  async create(
    @Body('salary', ParseFloatPipe) salary: number,
    @Param('monthYear') monthYear: string,
    @CurrentUser('id') userId: string
  ) {
    return this.distributionService.create(salary, monthYear, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':monthYear')
  @Auth()
  async update(
    @Body() dto: DistributionUpdateDto,
    @CurrentUser('id') userId: string,
    @Param('monthYear') monthYear: string
  ) {
    return this.distributionService.update(dto, monthYear, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async incAmount(
    @Param('id') id: string,
    @Body() dto: DistributionTransferDto
  ) {
    return this.distributionService.incAmount(dto, id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async decAmount(
    @Param('id') id: string,
    @Body() dto: DistributionTransferDto
  ) {
    return this.distributionService.decAmount(dto, id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.distributionService.delete(id)
  }
}
