import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsDefined,
  isString,
} from 'class-validator';

export class LoginUserDTO {
  @IsDefined({ message: 'Email Should be Unique' })
  @IsNotEmpty({ message: 'User Should have a Email' })
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty({ message: 'User Should have a Password' })
  @Length(8, 25)
  password: string;
}
