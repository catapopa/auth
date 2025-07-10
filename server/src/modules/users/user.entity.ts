import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { UserRole, User as IUser } from '@auth/shared';

@Entity('users')
export class User implements Omit<IUser, 'createdAt' | 'updatedAt'> {
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  @Column()
  lastName: string;

  @ApiHideProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    example: UserRole.USER,
    description: 'User role',
    enum: UserRole,
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({
    example: true,
    description: 'Whether the user is active',
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'User creation date',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'User last update date',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
