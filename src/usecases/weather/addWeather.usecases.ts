import { ILogger } from '../../domain/logger/logger.interface';
import { WeatherRepository } from '../../domain/repositories/weatherRepository.interface';


export class addWeatherUseCases {
  constructor(private readonly logger: ILogger,
  private readonly weatherRepository: WeatherRepository,
) {}

  async execute(id: string): Promise<any> {

    const results = new Array;
    const array1 = [
      {
          "coord": {
              "lon": -49.2908,
              "lat": -25.504
          },
          "sys": {
              "country": "BR",
              "timezone": -10800,
              "sunrise": 1706258885,
              "sunset": 1706307049
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "chuva leve",
                  "icon": "10d"
              }
          ],
          "main": {
              "temp": 18.4,
              "feels_like": 17.99,
              "temp_min": 16.95,
              "temp_max": 21.03,
              "pressure": 1016,
              "humidity": 65
          },
          "visibility": 10000,
          "wind": {
              "speed": 7.2,
              "deg": 90
          },
          "clouds": {
              "all": 75
          },
          "dt": 1706300197,
          "id": 6322752,
          "name": "Curitiba"
      },
      {
          "coord": {
              "lon": -48.5012,
              "lat": -27.6146
          },
          "sys": {
              "country": "BR",
              "timezone": -10800,
              "sunrise": 1706258471,
              "sunset": 1706307084
          },
          "weather": [
              {
                  "id": 802,
                  "main": "Clouds",
                  "description": "nuvens dispersas",
                  "icon": "03d"
              }
          ],
          "main": {
              "temp": 21.31,
              "feels_like": 21.85,
              "temp_min": 20.57,
              "temp_max": 23.4,
              "pressure": 1018,
              "humidity": 90
          },
          "visibility": 10000,
          "wind": {
              "speed": 4.12,
              "deg": 190
          },
          "clouds": {
              "all": 40
          },
          "dt": 1706300197,
          "id": 6323121,
          "name": "Florianopolis"
      },
      {
          "coord": {
              "lon": -46.6361,
              "lat": -23.5475
          },
          "sys": {
              "country": "BR",
              "timezone": -10800,
              "sunrise": 1706258447,
              "sunset": 1706306212
          },
          "weather": [
              {
                  "id": 803,
                  "main": "Clouds",
                  "description": "nublado",
                  "icon": "04d"
              }
          ],
          "main": {
              "temp": 21.22,
              "feels_like": 21.51,
              "temp_min": 19.69,
              "temp_max": 22.83,
              "pressure": 1018,
              "humidity": 81
          },
          "visibility": 10000,
          "wind": {
              "speed": 7.6,
              "deg": 193
          },
          "clouds": {
              "all": 75
          },
          "dt": 1706300051,
          "id": 3448439,
          "name": "Sao Paulo"
      }
  ];
  let idb = 1;
    array1.forEach(async (data) => {
      const weather = {
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
    });

    return results[0];
  }
}
