export interface IOpenWeatherServicePayload {
  id: string;
  units: string;
  lang: string;
}


export interface IOpenWeatherService {
  getMultiWeather(payload: IOpenWeatherServicePayload): Promise<any[]> ;
}
