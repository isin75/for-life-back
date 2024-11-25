import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
  ParseFloatPipe
} from '@nestjs/common'
import { GoalsService } from './goals.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { DecGoalsDto, GoalsDto, GoalsSettingsDto } from './dto/goals.dto'

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @Auth()
  async get(userId: string) {
    return this.goalsService.get(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: GoalsDto, @CurrentUser('id') userId: string) {
    return this.goalsService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async update(
    @Body() dto: GoalsDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string
  ) {
    return this.goalsService.update(dto, id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('inc/:id')
  @Auth()
  async incAmount(
    @Body('sum', ParseFloatPipe) sum: number,
    @CurrentUser('id') userId: string,
    @Param('id') id: string
  ) {
    return this.goalsService.incAmount(sum, id, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('dec/:id')
  @Auth()
  async decAmount(
    @Body() decGoalsDto: DecGoalsDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string
  ) {
    return this.goalsService.decAmount(decGoalsDto, id, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.goalsService.delete(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('settings')
  @Auth()
  async createSettings(
    @Body() goalsSettingsDto: GoalsSettingsDto,
    @CurrentUser('id') userId: string
  ) {
    return this.goalsService.createSettings(goalsSettingsDto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('settings/:id')
  @Auth()
  async updateSettings(
    @Body() goalsSettingsDto: GoalsSettingsDto,
    @Param('id') id: string
  ) {
    return this.goalsService.updateSettings(goalsSettingsDto, id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('settings/:id')
  @Auth()
  async deletedSettings(@Param('id') id: string) {
    return this.goalsService.deletedSetting(id)
  }
}
