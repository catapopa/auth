import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Admin@2024#Secure!',
    description: 'User password',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
