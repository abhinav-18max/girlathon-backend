import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Transform(({ value }) => value.trim())
  email: string;
}
