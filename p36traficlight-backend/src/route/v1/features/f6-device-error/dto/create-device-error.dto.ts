import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateDeviceErrorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly code: number;

  @IsString()
  @IsNotEmpty()
  readonly reason: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}
