import {
  IsMongoId,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateConfigurationDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly idDevice: string;

  @IsOptional()
  @IsNumber()
  readonly position: number;

  @IsOptional()
  @IsString()
  readonly parameter: string;

  @IsNotEmpty()
  @IsNumber()
  readonly byte: number;

  @IsNotEmpty()
  @IsNumber()
  readonly value: number;
}
