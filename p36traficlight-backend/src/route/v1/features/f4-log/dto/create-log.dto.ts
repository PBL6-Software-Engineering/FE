import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateLogDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly idUser: string;

  @IsNumber()
  @IsOptional()
  readonly accessTime: number;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  readonly action: string;

  @IsString()
  @IsOptional()
  readonly ip: string;
}
