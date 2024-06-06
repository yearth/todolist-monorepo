import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateOneDto } from './dto/create-one.dto/create-one.dto';
import { UpdateOneDto } from './dto/update-one.dto/update-one.dto';
import { Category } from './entities/category.entity';
import { Todo } from './entities/todos.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  private async preloadCategoryByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { name } });
    if (category) {
      return category;
    }
    return this.categoryRepository.create({ name });
  }

  getAll(paginationQueryDto: PaginationQueryDto) {
    return this.todoRepository.find({
      skip: paginationQueryDto.offset,
      take: paginationQueryDto.limit,
      relations: ['categories'],
    });
  }

  async getOne(id: number) {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }

  async createOne(createOneDto: CreateOneDto) {
    const categories = await Promise.all(
      createOneDto.categories.map(async (name) =>
        this.preloadCategoryByName(name),
      ),
    );

    const todo = this.todoRepository.create({
      ...createOneDto,
      categories,
    });
    return this.todoRepository.save(todo);
  }

  async updateOne(id: number, updateOneDto: UpdateOneDto) {
    const categories =
      updateOneDto.categories &&
      (await Promise.all(
        updateOneDto.categories.map(async (name) =>
          this.preloadCategoryByName(name),
        ),
      ));

    // preload is secruity feature to update data without fetching it from database again
    const todo = await this.todoRepository.preload({
      id,
      ...updateOneDto,
      categories,
    });
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
