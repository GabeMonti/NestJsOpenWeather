import { Module } from '@nestjs/common';
import { OpenWeatherService } from './openweather.service';

@Module({
  imports: [

  ],
  providers: [OpenWeatherService],
  exports: [OpenWeatherService],
})
export class OpenWeatherModule {}
