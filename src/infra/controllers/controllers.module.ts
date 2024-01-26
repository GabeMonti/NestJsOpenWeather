import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { TodoController } from './todo/todo.controller';
import { WeatherController } from './weather/weather.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [TodoController, AuthController, WeatherController],
})
export class ControllersModule {}
