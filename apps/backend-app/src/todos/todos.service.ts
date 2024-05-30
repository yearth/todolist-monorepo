import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOneDto } from './dto/create-one.dto/create-one.dto';
import { UpdateOneDto } from './dto/update-one.dto/update-one.dto';
import { Todo } from './entities/todos.entites';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  getAll() {
    return this.todoRepository.find();
  }

  async getOne(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }

  createOne(createOneDto: CreateOneDto) {
    const todo = this.todoRepository.create(createOneDto);
    return this.todoRepository.save(todo);
  }

  async updateOne(id: number, updateOneDto: UpdateOneDto) {
    // preload is secruity feature to update data without fetching it from database again
    const todo = await this.todoRepository.preload({ id, ...updateOneDto });
    if (!todo) {
      throw new Error('Todo not found');
    }
    return this.todoRepository.save(todo);
  }

  async deleteOne(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new Error('Todo not found');
    }
    return this.todoRepository.remove(todo);
  }
}
