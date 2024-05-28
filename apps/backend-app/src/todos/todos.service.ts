import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schema/todos.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: typeof Model<Todo>) {}

  getAllTodos(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }
}
