import { ApiProperty } from '@nestjs/swagger';
import { WeatherM } from '../../../domain/model/weather';

export class WeatherPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  city: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  lat: number;
  @ApiProperty()
  lon: number;
  @ApiProperty()
  weather_main: string;
  @ApiProperty()
  weather_description: string;
  @ApiProperty()
  weather_temp: number;
  @ApiProperty()
  weather_feels_like: number;
  @ApiProperty()
  weather_temp_min: number;
  @ApiProperty()
  weather_temp_max: number;
  @ApiProperty()
  weather_pressure: number;
  @ApiProperty()
  weather_humidity: number;
  @ApiProperty()
  createdate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(weather: WeatherM) {
    this.id = weather.id;
    this.id = weather.id;
    this.city = weather.city;
    this.country = weather.country;
    this.lat = weather.lat;
    this.lon = weather.lon;
    this.weather_main = weather.weather_main;
    this.weather_description = weather.weather_description;
    this.weather_temp = weather.weather_temp;
    this.weather_feels_like = weather.weather_feels_like;
    this.weather_temp_min = weather.weather_temp_min;
    this.weather_temp_max = weather.weather_temp_max;
    this.weather_pressure = weather.weather_pressure;
    this.weather_humidity = weather.weather_humidity;
    this.createdate = weather.createdDate;
    this.updateddate = weather.updatedDate;
  }
}
