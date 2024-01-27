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

  async updateContent(id: number, weatherDesc: string): Promise<void> {
    await this.weatherEntityRepository.update(
      {
        id: id,
      },
      { weather_description: weatherDesc },
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
  async findByNameAndDate(cityName: string, startDate: Date, endDate: Date): Promise<any> {
    const weathersEntity = await this.weatherEntityRepository.createQueryBuilder("weather")
      .where("weather.city = :name", { cityName: cityName })
      .andWhere("weather.created_date >= :startDate", { startDate: startDate })
      .andWhere("weather.created_date <= :endDate", { endDate: endDate });
      return weathersEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.weatherEntityRepository.delete({ id: id });
  }

  private toWeather(weatherEntity: Weather): WeatherM {
    const weather: WeatherM = new WeatherM();

    weather.id = weatherEntity.id;
    weather.city = weatherEntity.city;
    weather.country = weatherEntity.country;
    weather.lat = weatherEntity.lat;
    weather.lon = weatherEntity.lon;
    weather.weather_main = weatherEntity.weather_main;
    weather.weather_description = weatherEntity.weather_description;
    weather.weather_temp = weatherEntity.weather_temp;
    weather.weather_feels_like = weatherEntity.weather_feels_like;
    weather.weather_temp_min = weatherEntity.weather_temp_min;
    weather.weather_temp_max = weatherEntity.weather_temp_max;
    weather.weather_pressure = weatherEntity.weather_pressure;
    weather.weather_humidity = weatherEntity.weather_humidity;
    weather.created_date = weatherEntity.created_date;
    weather.updated_date = weatherEntity.updated_date;

    return weather;
  }

  private toWeatherEntity(weather: WeatherM): Weather {
    const weatherEntity: Weather = new Weather();

    weatherEntity.city = weather.city;
    weatherEntity.country = weather.country;
    weatherEntity.lat = weather.lat;
    weatherEntity.lon = weather.lon;
    weatherEntity.weather_main = weather.weather_main;
    weatherEntity.weather_description = weather.weather_description;
    weatherEntity.weather_temp = weather.weather_temp;
    weatherEntity.weather_feels_like = weather.weather_feels_like;
    weatherEntity.weather_temp_min = weather.weather_temp_min;
    weatherEntity.weather_temp_max = weather.weather_temp_max;
    weatherEntity.weather_pressure = weather.weather_pressure;
    weatherEntity.weather_humidity = weather.weather_humidity;

    return weatherEntity;
  }
}
