import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  nama: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  refresh_token: string;
}

export class RegisterDto extends PickType(UserDto, [
  'nama',
  'username',
  'email',
  'password',
]) {}

export class LoginDto extends PickType(UserDto, ['username', 'password']) {}
