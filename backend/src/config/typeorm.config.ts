import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { PMP } from 'src/modules/pmp/entities/pmp.entity';
import { QuestionCategory } from 'src/modules/pmp/entities/question-category.entity';
import { Question } from 'src/modules/pmp/entities/question.entity';
import { QuestionBonusLink } from 'src/modules/pmp/entities/question-bonus-link.entity';
import { Classroom } from 'src/modules/classroom/entities/classroom.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      entities: [Classroom, PMP, QuestionCategory, Question, QuestionBonusLink],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: true, //disable this in case we use migrations
      logging: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [Classroom, PMP, QuestionCategory, Question, QuestionBonusLink],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: true,
  logging: true,
};

export const testOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TEST_DATABASE_HOST,
  port: parseInt(process.env.TEST_DATABASE_PORT, 10),
  username: process.env.TEST_DATABASE_USERNAME,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Automatically create the schema in the test database
  dropSchema: true, // Drops the schema at the end of every test suite
};
