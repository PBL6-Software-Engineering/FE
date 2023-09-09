import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FileFirmwareDto } from './file-firmware.dto';

export default class CreateFirmwareDto {
  @IsString()
  @IsNotEmpty()
  readonly nameModel: string;

  @IsString()
  @IsNotEmpty()
  readonly version: string;

  @IsNumber()
  @IsNotEmpty()
  readonly dateRelease: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => FileFirmwareDto)
  readonly file: FileFirmwareDto;

  @IsString()
  @IsOptional()
  readonly description: string;
}
