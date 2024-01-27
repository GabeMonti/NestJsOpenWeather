import { WeatherM } from '../model/weather';

export interface WeatherRepository {
  insert(weather: WeatherM): Promise<WeatherM>;
  findAll(): Promise<WeatherM[]>;
  findById(id: number): Promise<WeatherM>;
  findByNameAndDate(cityName: string, startDate: Date, endDate: Date): Promise<WeatherM[]>;
  updateContent(id: number, weatherDesc: string): Promise<void>;
  deleteById(id: number): Promise<void>;
}
