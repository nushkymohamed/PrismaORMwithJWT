import { IsDefined, IsEmail, Length, IsString } from 'class-validator';

export class UpdateUSerDTO {
  @IsDefined()
  @Length(5, 50)
  @IsString()
  name?: string;

  @IsDefined()
  @IsEmail()
  email?: string;

  @IsDefined()
  @Length(8, 25)
  password?: string;
}
