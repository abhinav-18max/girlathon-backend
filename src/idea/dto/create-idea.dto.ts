import { Generated } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIdeaDto {
  @Generated() id: string;

  @IsString()
  @IsNotEmpty({
    message: 'Title is required',
  })
  title: string;

  @IsString()
  @IsNotEmpty({
    message: 'Description is required',
  })
  description: string;

  @IsString()
  @IsNotEmpty({
    message: 'Category is required',
  })
  category: string;

  @IsString()
  @IsNotEmpty({
    message: 'Team name is required',
  })
  team: string;
}
