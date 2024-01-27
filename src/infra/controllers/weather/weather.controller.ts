import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { GetWeatherUseCases } from '../../../usecases/weather/getWeather.usecases';
import { WeatherPresenter } from './weather.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { getWeathersUseCases } from '../../../usecases/weather/getWeathers.usecases';
import { updateWeatherUseCases } from '../../../usecases/weather/updateWeather.usecases';
import { AddWeatherDto, UpdateWeatherDto } from './weather.dto';
import { deleteWeatherUseCases } from '../../../usecases/weather/deleteWeather.usecases';
import { addWeatherUseCases } from '../../../usecases/weather/addWeather.usecases';
import { Cron } from '@nestjs/schedule';

@Controller('Weather')
@ApiTags('weather')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(WeatherPresenter)
export class WeatherController {
  constructor(
    @Inject(UsecasesProxyModule.GET_WEATHER_USECASES_PROXY)
    private readonly getweatherUsecaseProxy: UseCaseProxy<GetWeatherUseCases>,
    @Inject(UsecasesProxyModule.GET_WEATHERS_USECASES_PROXY)
    private readonly getAllweatherUsecaseProxy: UseCaseProxy<getWeathersUseCases>,
    @Inject(UsecasesProxyModule.PUT_WEATHER_USECASES_PROXY)
    private readonly updateweatherUsecaseProxy: UseCaseProxy<updateWeatherUseCases>,
    @Inject(UsecasesProxyModule.DELETE_WEATHER_USECASES_PROXY)
    private readonly deleteweatherUsecaseProxy: UseCaseProxy<deleteWeatherUseCases>,
    @Inject(UsecasesProxyModule.POST_WEATHER_USECASES_PROXY)
    private readonly addweatherUsecaseProxy: UseCaseProxy<addWeatherUseCases>,
  ) {}

  @Get('weather')
  @ApiResponseType(WeatherPresenter, false)
  async getweather(@Param('cityName') cityName: string, @Param('startDate') startDate: Date,  @Param('endDate') endDate: Date) {
    const weather = await this.getweatherUsecaseProxy.getInstance().execute(cityName, startDate, endDate);
    return weather.map((weather) => new WeatherPresenter(weather));
  }

  @Get('weathers')
  @ApiResponseType(WeatherPresenter, true)
  async getweathers() {
    const weathers = await this.getAllweatherUsecaseProxy.getInstance().execute();
    return weathers.map((weather) => new WeatherPresenter(weather));
  }

  @Put('weather')
  @ApiResponseType(WeatherPresenter, true)
  async updateweather(@Body() updateWeatherDto: UpdateWeatherDto) {
    const { id, weatherDesc } = updateWeatherDto;
    await this.updateweatherUsecaseProxy.getInstance().execute(id, weatherDesc);
    return 'updated with success success';
  }

  @Delete('weather')
  @ApiResponseType(WeatherPresenter, true)
  async deleteweather(@Query('id', ParseIntPipe) id: number) {
    await this.deleteweatherUsecaseProxy.getInstance().execute(id);
    return 'deleted with success';
  }

  @Post('weather')
  @Cron('*/15 * * * *')
  @ApiResponseType(WeatherPresenter, true)
  async addweather(@Body() addWeatherDto: AddWeatherDto) {
    const { id } = addWeatherDto;
    const weatherCreated = await this.addweatherUsecaseProxy.getInstance().execute(id);
    return new WeatherPresenter(weatherCreated);
  }
}
