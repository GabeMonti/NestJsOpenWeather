import { WeatherM } from '../model/weather';

export interface WeatherRepository {
  insert(weather: WeatherM): Promise<WeatherM>;
  findAll(): Promise<WeatherM[]>;
  findById(id: number): Promise<WeatherM>;
  updateContent(id: number, isDone: boolean): Promise<void>;
  deleteById(id: number): Promise<void>;
}
