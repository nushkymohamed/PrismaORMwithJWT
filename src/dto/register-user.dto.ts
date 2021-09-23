import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsDefined,
  IsDateString,
  IsString,
} from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  @IsDefined()
  @IsNotEmpty({ message: 'User Should have a Name' })
  @Length(5, 50)
  name: string;

  @IsDefined({ message: 'Email Should be Unique' })
  @IsNotEmpty({ message: 'User Should have a Email' })
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty({ message: 'User Should have a Password' })
  @Length(8, 25)
  password: string;
}
