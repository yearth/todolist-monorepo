import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './todos.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Todo, (todo) => todo.categories)
  todos: Todo[];
}
