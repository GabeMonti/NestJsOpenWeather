import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './infra/common/filter/exception.filter';
import { LoggingInterceptor } from './infra/common/interceptors/logger.interceptor';
import { ResponseFormat, ResponseInterceptor } from './infra/common/interceptors/response.interceptor';
import { LoggerService } from './infra/logger/logger.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1.0');
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());


  const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Weather Api')
      .setDescription('Weather Api - Fasters Test')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
