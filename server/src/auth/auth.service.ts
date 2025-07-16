import { LoginDto, User } from '@auth/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { User as UserEntity } from '../modules/users/user.entity';

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
      (await this.usersService.validatePassword(password, user.password))
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      // Check if user exists but is inactive
      const existingUser = await this.usersService.findByEmail(loginDto.email);
      if (existingUser && !existingUser.isActive) {
        throw new UnauthorizedException(
          'Account is deactivated. Please contact an administrator.'
        );
      }
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
      },
    };
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
