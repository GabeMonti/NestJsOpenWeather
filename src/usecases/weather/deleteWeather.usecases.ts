import { ILogger } from '../../domain/logger/logger.interface';
import { WeatherRepository } from '../../domain/repositories/weatherRepository.interface';

export class deleteWeatherUseCases {
  constructor(private readonly logger: ILogger, private readonly weatherRepository: WeatherRepository) {}

  async execute(id: number): Promise<void> {
    await this.weatherRepository.deleteById(id);
    this.logger.log('deleteWeatherUseCases execute', `Weather ${id} have been deleted`);
  }
}
