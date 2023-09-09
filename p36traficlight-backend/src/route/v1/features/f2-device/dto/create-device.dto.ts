import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { CoordinatesType } from 'src/util/types/coordinates.type';
import { CoordinatesDto } from 'src/util/types/dto/coordinates.dto';

export default class CreateDeviceDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly idTypeDevice: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idProvince: ObjectId;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly childs: string[];

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly deviceCode: number;

  @IsOptional()
  @IsString()
  readonly ip: string;

  @IsOptional()
  @IsNumber()
  readonly port: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  readonly coordinate: CoordinatesType;

  @IsOptional()
  @IsNumber()
  readonly position: number;

  @IsOptional()
  @IsBoolean()
  readonly isGroup: boolean;
}
