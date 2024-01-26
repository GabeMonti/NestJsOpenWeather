import { WeatherM } from '../../domain/model/weather';
import { WeatherRepository } from '../../domain/repositories/weatherRepository.interface';

export class getWeathersUseCases {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async execute(): Promise<WeatherM[]> {
    return await this.weatherRepository.findAll();
  }
}
