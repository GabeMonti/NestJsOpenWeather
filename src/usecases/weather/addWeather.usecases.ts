import { ILogger } from '../../domain/logger/logger.interface';
import { WeatherM } from '../../domain/model/weather';
import { WeatherRepository } from '../../domain/repositories/weatherRepository.interface';
import { IOpenWeatherServicePayload, IOpenWeatherService } from '../../domain/adapters/openweather.interface';


export class addWeatherUseCases {
  constructor(private readonly logger: ILogger,
  private readonly weatherRepository: WeatherRepository,
  private readonly IOpenWeatherService: IOpenWeatherService
) {}

  async execute(id: string): Promise<any> {
    let idb = 1;
    const payload: IOpenWeatherServicePayload = { 
      id: id,
      units: 'metric',
      lang: 'pt_br',
    };
    const results = new Array;
    await this.IOpenWeatherService.getMultiWeather(payload)
      .then((data) => {
        console.log(data);
        return data.forEach(async (data) => {
          const weather : WeatherM = {
            id: idb,
            city: data.name,
            country: data.sys.country,
            lat: data.coord.lat,
            lon: data.coord.lon,
            weather_main: data.weather[0].main,
            weather_description: data.weather[0].description,
            weather_temp: data.main.temp,
            weather_feels_like: data.main.feels_like,
            weather_temp_min: data.main.temp_min,
            weather_temp_max: data.main.temp_max,
            weather_pressure: data.main.pressure,
            weather_humidity: data.main.humidity,
            created_date: new Date(),
            updated_date: new Date()
          };
          idb++
          const result = await this.weatherRepository.insert(weather);
          this.logger.log('addWeatherUseCases execute', 'New weather data have been inserted');
          results.push(result)
        });;
      })
      .catch((err: any) => {
        console.log(err);
      });

    return results;
  }
}
