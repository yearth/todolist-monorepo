import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schema/todos.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: typeof Model<Todo>) {}

  getAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  createOne(todo: any) {
    console.log('🚀 ~ TodosService ~ createOne ~ todo:', todo);
    // const newTodo = new this.todoModel(todo);
    // return newTodo.save();
  }
}
