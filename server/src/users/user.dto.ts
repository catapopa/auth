import {
  IsEmail,
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  MinLength,
} from 'class-validator';
import {
  UserRole,
  CreateUserDto as ICreateUserDto,
  UpdateUserDto as IUpdateUserDto,
  LoginDto as ILoginDto,
} from '@auth/shared';

export class CreateUserDto implements ICreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateUserDto implements IUpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  firstName?: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  lastName?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class LoginDto implements ILoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
