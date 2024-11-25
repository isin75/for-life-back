import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Post,
  Get,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { SalaryService } from './salary.service'
import { SalaryDto, SalarySettingsDto } from './dto/salary.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: SalaryDto, @CurrentUser('id') userId: string) {
    return this.salaryService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('settings')
  @Auth()
  async setSettings(
    @Body() dto: SalarySettingsDto,
    @CurrentUser('id') userId: string
  ) {
    return this.salaryService.setSettings(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.salaryService.getAll(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(':month')
  @Auth()
  async getSalary(
    @Param('month') monthString: string,
    @CurrentUser('id') userId: string
  ) {
    return this.salaryService.getSalary(monthString, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async update(@Body() dto: SalaryDto, @Param('id') id: string) {
    return this.salaryService.update(dto, id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.salaryService.delete(id)
  }
}
