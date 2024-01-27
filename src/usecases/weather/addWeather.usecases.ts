import { ILogger } from '../../domain/logger/logger.interface';
import { WeatherM } from '../../domain/model/weather';
import { WeatherRepository } from '../../domain/repositories/weatherRepository.interface';
import { IOpenWeatherServicePayload } from '../../domain/adapters/openweather.interface';
import { Cron } from '@nestjs/schedule';
import axios from "axios";


export class addWeatherUseCases {
  constructor(private readonly logger: ILogger,
  private readonly weatherRepository: WeatherRepository,
) {}

  @Cron('*/15 * * * *')
  async execute(id: string): Promise<any> {
    let idb = 1;
    const payload: IOpenWeatherServicePayload = { 
      id: id,
      units: 'metric',
      lang: 'pt_br',
    };
    const results = new Array;
    axios.get(`${process.env.OPEN_WEATHER_API_URL}/group?id=${payload.id}&units=${payload.units}&lang=${payload.lang}&appid=${process.env.OPEN_WEATHER_API_KEY}`)
      .then((res: { data: any; }) => {
        const dataArray = res?.data?.list;
        return dataArray.forEach(async (data: { name: any; sys: { country: any; }; coord: { lat: any; lon: any; }; weather: { main: any; description: any;}[]; main: { temp: any; feels_like: any; temp_min: any; temp_max: any; pressure: any; humidity: any; }; }) => {
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
