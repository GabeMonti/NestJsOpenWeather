import { WeatherM } from '../../domain/model/weather';
import { WeatherRepository } from '../../domain/repositories/weatherRepository.interface';

export class GetWeatherUseCases {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async execute(id: number): Promise<WeatherM> {
    return await this.weatherRepository.findById(id);
  }
}
