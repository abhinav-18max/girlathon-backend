import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone Number is required' })
  @Transform(({ value }) => value.trim())
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Team Name is required' })
  @Transform(({ value }) => value.trim())
  team: string;
}
