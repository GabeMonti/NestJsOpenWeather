import { WeatherM } from '../../domain/model/weather';
import { WeatherRepository } from '../../domain/repositories/weatherRepository.interface';

export class GetWeatherUseCases {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async execute(cityName: string, startDate: Date, endDate: Date): Promise<WeatherM[]> {
    return await this.weatherRepository.findByNameAndDate(cityName, startDate, endDate);
  }
}
