import {
  IsInt,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  Length,
  IsString,
} from 'class-validator';

export class UserDTO {
  @IsInt()
  id: number;

  @IsDefined()
  @IsNotEmpty()
  @Length(5, 50)
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @Length(8, 25)
  password: string;
}
