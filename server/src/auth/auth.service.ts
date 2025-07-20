import { LoginDto, User } from '@auth/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { User as UserEntity } from '../modules/users/user.entity';
import bcrypt from 'bcryptjs/umd/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (
      user &&
      user.isActive &&
      (await this.validatePassword(password, user.password))
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Account is deactivated. Please contact an administrator.'
      );
    }

    if (!(await this.validatePassword(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;

    const payload = {
      email: userWithoutPassword.email,
      sub: userWithoutPassword.id,
      role: userWithoutPassword.role,
      firstName: userWithoutPassword.firstName,
      lastName: userWithoutPassword.lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        firstName: userWithoutPassword.firstName,
        lastName: userWithoutPassword.lastName,
        role: userWithoutPassword.role,
        isActive: userWithoutPassword.isActive,
      },
    };
  }

  async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  getProfile(user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
