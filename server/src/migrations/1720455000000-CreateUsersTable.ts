import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUsersTable1720455000000 implements MigrationInterface {
  name = 'CreateUsersTable1720455000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum type for user roles
    await queryRunner.query(
      `CREATE TYPE "user_role_enum" AS ENUM('admin', 'user')`,
    );

    // Create users table
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['admin', 'user'],
            default: "'user'",
            isNullable: false,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Create index on email for faster lookups
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USERS_EMAIL',
        columnNames: ['email'],
      }),
    );

    // Insert default admin user (password is 'Admin@2024#Secure!' hashed)
    await queryRunner.query(`
      INSERT INTO users (email, "firstName", "lastName", password, role, "isActive") 
      VALUES (
        'admin@example.com', 
        'Admin', 
        'User', 
        '$2b$10$qzpzXs.jB3VEeiqd/PwJAeH5.mInRYlKyr4Kz42a/YMpnSsUntoDO', 
        'admin', 
        true
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the users table
    await queryRunner.dropTable('users');

    // Drop the enum type
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
  }
}
