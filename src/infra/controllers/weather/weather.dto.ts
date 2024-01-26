import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateWeatherDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  readonly isDone: boolean;
}

export class AddWeatherDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
