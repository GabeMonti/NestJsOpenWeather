import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import { Weather } from '../entities/weather.entity';
import { DatabaseTodoRepository } from './todo.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseWeatherRepository } from './weather.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Todo, User, Weather])],
  providers: [DatabaseTodoRepository, DatabaseUserRepository, DatabaseWeatherRepository],
  exports: [DatabaseTodoRepository, DatabaseUserRepository, DatabaseWeatherRepository],
})
export class RepositoriesModule {}
