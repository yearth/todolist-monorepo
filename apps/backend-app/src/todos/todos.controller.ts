import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateOneDto } from './dto/create-one.dto/create-one.dto';
import { UpdateOneDto } from './dto/update-one.dto/update-one.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('/getAll')
  async getAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return await this.todosService.getAll(paginationQueryDto);
  }

  @Get('/getOne/:id')
  async getOne(@Param('id') id: string) {
    return await this.todosService.getOne(+id);
  }

  @Post('/createOne')
  async createOne(@Body() createOne: CreateOneDto) {
    return await this.todosService.createOne(createOne);
  }

  @Patch('/updateOne/:id')
  async updateOne(@Param('id') id: string, @Body() updateOne: UpdateOneDto) {
    return await this.todosService.updateOne(+id, updateOne);
  }

  @Delete('/deleteOne/:id')
  async deleteOne(@Param('id') id: string) {
    return await this.todosService.deleteOne(+id);
  }
}
