import { ILogger } from '../../domain/logger/logger.interface';
import { WeatherM } from '../../domain/model/weather';
import { WeatherRepository } from '../../domain/repositories/weatherRepository.interface';

export class addWeatherUseCases {
  constructor(private readonly logger: ILogger, private readonly weatherRepository: WeatherRepository) {}

  async execute(content: string): Promise<WeatherM> {
    const weather = new WeatherM();
    weather.content = content;
    weather.isDone = false;
    const result = await this.weatherRepository.insert(weather);
    this.logger.log('addWeatherUseCases execute', 'New weather data have been inserted');
    return result;
  }
}
