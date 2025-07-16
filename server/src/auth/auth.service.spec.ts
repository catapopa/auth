import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../modules/users/users.service';
import { UserRole } from '@auth/shared';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'hashedPassword',
    role: UserRole.USER,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    validatePassword: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user data when user is active and password is valid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockUsersService.validatePassword.mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeDefined();
      expect(result?.email).toBe('test@example.com');
      expect(result).not.toHaveProperty('password');
    });

    it('should return null when user is inactive', async () => {
      mockUsersService.findByEmail.mockResolvedValue({
        ...mockUser,
        isActive: false,
      });
      mockUsersService.validatePassword.mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockUsersService.validatePassword.mockResolvedValue(false);

      const result = await service.validateUser(
        'test@example.com',
        'wrongpassword'
      );

      expect(result).toBeNull();
    });

    it('should return null when user does not exist', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser(
        'nonexistent@example.com',
        'password'
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException with specific message for inactive user', async () => {
      mockUsersService.findByEmail
        .mockResolvedValueOnce(null) // First call in validateUser returns null
        .mockResolvedValueOnce({ ...mockUser, isActive: false }); // Second call in login
      mockUsersService.validatePassword.mockResolvedValue(true);

      await expect(
        service.login({
          email: 'test@example.com',
          password: 'password',
        })
      ).rejects.toThrow(
        new UnauthorizedException(
          'Account is deactivated. Please contact an administrator.'
        )
      );
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'nonexistent@example.com',
          password: 'password',
        })
      ).rejects.toThrow(new UnauthorizedException('Invalid credentials'));
    });

    it('should return access token and user data for valid active user', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userResult } = { ...mockUser };

      jest.spyOn(service, 'validateUser').mockResolvedValue(userResult);

      const result = await service.login({
        email: 'test@example.com',
        password: 'password',
      });

      expect(result).toHaveProperty('access_token', 'mock-jwt-token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe('test@example.com');
      expect(result.user.isActive).toBe(true);
    });
  });
});
