import {
  IsEmail,
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  UserRole,
  CreateUserDto as ICreateUserDto,
  UpdateUserDto as IUpdateUserDto,
  LoginDto as ILoginDto,
} from '@auth/shared';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    example: 'SecurePass123!',
    description: 'User password',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: UserRole.USER,
    description: 'User role',
    enum: UserRole,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    example: true,
    description: 'Whether the user is active',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateUserDto implements IUpdateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
    minLength: 2,
    required: false,
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
    minLength: 2,
    required: false,
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    example: 'NewSecurePass123!',
    description: 'User password',
    minLength: 6,
    required: false,
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: UserRole.USER,
    description: 'User role',
    enum: UserRole,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    example: true,
    description: 'Whether the user is active',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class LoginDto implements ILoginDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Admin@2024#Secure!',
    description: 'User password',
  })
  @IsString()
  password: string;
}
