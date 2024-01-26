import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherM } from '../../domain/model/weather';
import { WeatherRepository } from '../../domain/repositories/weatherRepository.interface';
import { Weather } from '../entities/weather.entity';

@Injectable()
export class DatabaseWeatherRepository implements WeatherRepository {
  constructor(
    @InjectRepository(Weather)
    private readonly weatherEntityRepository: Repository<Weather>,
  ) {}

  async updateContent(id: number, isDone: boolean): Promise<void> {
    await this.weatherEntityRepository.update(
      {
        id: id,
      },
      { is_done: isDone },
    );
  }
  async insert(weather: WeatherM): Promise<WeatherM> {
    const weatherEntity = this.toWeatherEntity(weather);
    const result = await this.weatherEntityRepository.insert(weatherEntity);
    return this.toWeather(result.generatedMaps[0] as Weather);
    console.log(result.generatedMaps);
  }
  async findAll(): Promise<WeatherM[]> {
    const weathersEntity = await this.weatherEntityRepository.find();
    return weathersEntity.map((weatherEntity) => this.toWeather(weatherEntity));
  }
  async findById(id: number): Promise<WeatherM> {
    const weatherEntity = await this.weatherEntityRepository.findOneById(id);
    return this.toWeather(weatherEntity!);
  }
  async deleteById(id: number): Promise<void> {
    await this.weatherEntityRepository.delete({ id: id });
  }

  private toWeather(weatherEntity: Weather): WeatherM {
    const weather: WeatherM = new WeatherM();

    weather.id = weatherEntity.id;
    weather.content = weatherEntity.content;
    weather.isDone = weatherEntity.is_done;
    weather.createdDate = weatherEntity.created_date;
    weather.updatedDate = weatherEntity.updated_date;

    return weather;
  }

  private toWeatherEntity(weather: WeatherM): Weather {
    const weatherEntity: Weather = new Weather();

    weatherEntity.id = weather.id;
    weatherEntity.content = weather.content;
    weatherEntity.is_done = weather.isDone;

    return weatherEntity;
  }
}
