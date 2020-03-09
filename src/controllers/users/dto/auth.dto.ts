import { IsEmail, IsString, Length } from 'class-validator';

export class UserAuthDTO {
  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @Length(4)
  public password: string;
}
