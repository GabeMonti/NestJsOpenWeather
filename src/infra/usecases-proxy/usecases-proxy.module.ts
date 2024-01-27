import { DynamicModule, Module } from '@nestjs/common';
import { addTodoUseCases } from '../../usecases/todo/addTodo.usecases';
import { deleteTodoUseCases } from '../../usecases/todo/deleteTodo.usecases';
import { GetTodoUseCases } from '../../usecases/todo/getTodo.usecases';
import { getTodosUseCases } from '../../usecases/todo/getTodos.usecases';
import { updateTodoUseCases } from '../../usecases/todo/updateTodo.usecases';

import { addWeatherUseCases } from '../../usecases/weather/addWeather.usecases';
import { deleteWeatherUseCases } from '../../usecases/weather/deleteWeather.usecases';
import { GetWeatherUseCases } from '../../usecases/weather/getWeather.usecases';
import { getWeathersUseCases } from '../../usecases/weather/getWeathers.usecases';
import { updateWeatherUseCases } from '../../usecases/weather/updateWeather.usecases';

import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseTodoRepository } from '../repositories/todo.repository';
import { DatabaseWeatherRepository } from '../repositories/weather.repository';
import { DatabaseUserRepository } from '../repositories/user.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';
  // Todo
  static GET_TODO_USECASES_PROXY = 'getTodoUsecasesProxy';
  static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';
  static POST_TODO_USECASES_PROXY = 'postTodoUsecasesProxy';
  static DELETE_TODO_USECASES_PROXY = 'deleteTodoUsecasesProxy';
  static PUT_TODO_USECASES_PROXY = 'putTodoUsecasesProxy';
  // Weather
  static GET_WEATHER_USECASES_PROXY = 'getWeatherUsecasesProxy';
  static GET_WEATHERS_USECASES_PROXY = 'getWeathersUsecasesProxy';
  static POST_WEATHER_USECASES_PROXY = 'postWeatherUsecasesProxy';
  static DELETE_WEATHER_USECASES_PROXY = 'deleteWeatherUsecasesProxy';
  static PUT_WEATHER_USECASES_PROXY = 'putWeatherUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODO_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) => new UseCaseProxy(new GetTodoUseCases(todoRepository)),
        },
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) => new UseCaseProxy(new getTodosUseCases(todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.POST_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new addTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new updateTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [LoggerService, DatabaseTodoRepository],
          provide: UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
          useFactory: (logger: LoggerService, todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new deleteTodoUseCases(logger, todoRepository)),
        },
        {
          inject: [DatabaseWeatherRepository],
          provide: UsecasesProxyModule.GET_WEATHER_USECASES_PROXY,
          useFactory: (weatherRepository: DatabaseWeatherRepository) => new UseCaseProxy(new GetWeatherUseCases(weatherRepository)),
        },
        {
          inject: [DatabaseWeatherRepository],
          provide: UsecasesProxyModule.GET_WEATHERS_USECASES_PROXY,
          useFactory: (weatherRepository: DatabaseWeatherRepository) => new UseCaseProxy(new getWeathersUseCases(weatherRepository)),
        },
        {
          inject: [LoggerService, DatabaseWeatherRepository],
          provide: UsecasesProxyModule.POST_WEATHER_USECASES_PROXY,
          useFactory: (logger: LoggerService, weatherRepository: DatabaseWeatherRepository) =>
            new UseCaseProxy(new addWeatherUseCases(logger, weatherRepository)),
        },
        {
          inject: [LoggerService, DatabaseWeatherRepository],
          provide: UsecasesProxyModule.PUT_WEATHER_USECASES_PROXY,
          useFactory: (logger: LoggerService, weatherRepository: DatabaseWeatherRepository) =>
            new UseCaseProxy(new updateWeatherUseCases(logger, weatherRepository)),
        },
        {
          inject: [LoggerService, DatabaseWeatherRepository],
          provide: UsecasesProxyModule.DELETE_WEATHER_USECASES_PROXY,
          useFactory: (logger: LoggerService, weatherRepository: DatabaseWeatherRepository) =>
            new UseCaseProxy(new deleteWeatherUseCases(logger, weatherRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_TODO_USECASES_PROXY,
        UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
        UsecasesProxyModule.POST_TODO_USECASES_PROXY,
        UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
        UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
        UsecasesProxyModule.GET_WEATHER_USECASES_PROXY,
        UsecasesProxyModule.GET_WEATHERS_USECASES_PROXY,
        UsecasesProxyModule.POST_WEATHER_USECASES_PROXY,
        UsecasesProxyModule.PUT_WEATHER_USECASES_PROXY,
        UsecasesProxyModule.DELETE_WEATHER_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
      ],
    };
  }
}