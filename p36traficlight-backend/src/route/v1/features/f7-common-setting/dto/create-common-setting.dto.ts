import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateCommonSettingDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsNumber()
  readonly numberTime: number;

  @IsOptional()
  @IsString()
  readonly unitTime: string;

  @IsOptional()
  @IsBoolean()
  readonly isShow: boolean;
}
