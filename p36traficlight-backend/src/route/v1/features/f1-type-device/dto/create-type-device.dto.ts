import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export default class CreateTypeDeviceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly thumbnail: string;

  @IsString()
  readonly image: string;
}
