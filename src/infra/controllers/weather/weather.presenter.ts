import { ApiProperty } from '@nestjs/swagger';
import { WeatherM } from '../../../domain/model/weather';

export class WeatherPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  isDone: boolean;
  @ApiProperty()
  createdate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(weather: WeatherM) {
    this.id = weather.id;
    this.content = weather.content;
    this.isDone = weather.isDone;
    this.createdate = weather.createdDate;
    this.updateddate = weather.updatedDate;
  }
}
