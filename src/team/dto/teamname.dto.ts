import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TeamNameDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Transform(({ value }) => value.trim())
  team: string;
}
