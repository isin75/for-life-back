import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { TimeBlockService } from './time-block.service'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { Auth } from '../auth/decorators/auth.decorator'
import { TimeBlockDto } from './dto/time-block.dto'

@Controller('user/time-blocks')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.timeBlockService.getAll(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string) {
    return this.timeBlockService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: TimeBlockDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string
  ) {
    return this.timeBlockService.update(dto, id, userId)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.timeBlockService.delete(id, userId)
  }
}
