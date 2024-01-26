import { ILogger } from '../../domain/logger/logger.interface';
import { WeatherRepository } from '../../domain/repositories/weatherRepository.interface';

export class updateWeatherUseCases {
  constructor(private readonly logger: ILogger, private readonly weatherRepository: WeatherRepository) {}

  async execute(id: number, isDone: boolean): Promise<void> {
    await this.weatherRepository.updateContent(id, isDone);
    this.logger.log('updateWeatherUseCases execute', `Weather ${id} have been updated`);
  }
}
