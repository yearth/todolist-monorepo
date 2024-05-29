import { IsBoolean, IsString } from 'class-validator';

export class CreateOneDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly isDone: boolean;
}
