import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransationService } from './transation.service';
import { CreateTransationDto } from './aplication/dto/create-transation.dto';
import { UpdateTransationDto } from './aplication/dto/update-transation.dto';

@Controller('transation')
export class TransationController {
  constructor(private readonly transationService: TransationService) {}

  @Post()
  create(@Body() createTransationDto: CreateTransationDto) {
    return this.transationService.create(createTransationDto);
  }

  @Get()
  findAll() {
    return this.transationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransationDto: UpdateTransationDto,
  ) {
    return this.transationService.update(+id, updateTransationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transationService.remove(+id);
  }
}
