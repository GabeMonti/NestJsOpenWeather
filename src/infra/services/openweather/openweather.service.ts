import { Injectable } from '@nestjs/common';
import { IOpenWeatherService, IOpenWeatherServicePayload } from '../../../domain/adapters/openweather.interface';
import axios from "axios";


@Injectable()
export class OpenWeatherService implements IOpenWeatherService {
  constructor() {}

  async getMultiWeather(payload: IOpenWeatherServicePayload): Promise<any[]> {
    axios.get(`${process.env.OPEN_WEATHER_API_URL}/group?id=${payload.id}&units=${payload.units}&lang=${payload.lang}&appid=${process.env.OPEN_WEATHER_API_KEY}`)
    .then((res: { data: any; }) => {
      //console.log(res.data);
      return res?.data?.list;
    })
    .catch((err: any) => {
      console.log(err);
    });
    return [];
  }

}

