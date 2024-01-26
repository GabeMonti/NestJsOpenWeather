import { Injectable } from '@nestjs/common';
import { IOpenWeatherService, IOpenWeatherServicePayload } from '../../../domain/adapters/openweather.interface';


@Injectable()
export class OpenWeatherService implements IOpenWeatherService {
  constructor(private readonly openWeatherService: IOpenWeatherService) {}

  async getMultiWeather(payload: IOpenWeatherServicePayload): Promise<any> {
    try {
      const data = await this.openWeatherService.getMultiWeather(payload);
      return data;
    } catch (Exception) { 
      console.error(Exception);
    }
  }

}

