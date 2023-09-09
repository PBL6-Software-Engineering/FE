import { IsNumber, IsOptional } from 'class-validator';

export class CoordinatesDto {
  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  lng: number;
}
