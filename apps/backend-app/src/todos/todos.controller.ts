import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateOneDto } from './dto/create-one.dto/create-one.dto';
import { UpdateOneDto } from './dto/update-one.dto/update-one.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('/getAll')
  async getAll() {
    return await this.todosService.getAll();
  }

  @Post('/createOne')
  async createOne(@Body() createOne: CreateOneDto) {
    return await this.todosService.createOne(createOne);
  }

  @Patch('/updateOne/:id')
  async updateOne(@Param('id') id: string, @Body() updateOne: UpdateOneDto) {
    console.log('🚀 ~ TodosController ~ updateOne ~ id:', id);
    console.log('🚀 ~ TodosController ~ updateOne ~ updateOne:', updateOne);
    // return await this.todosService.updateOne(id, updateOne);
  }
}
