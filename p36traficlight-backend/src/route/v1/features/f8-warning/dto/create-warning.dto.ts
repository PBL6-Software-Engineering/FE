import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { TypeWarningEnum } from '@enum/type-warning.enum';
import { StatusWarningEnum } from '@enum/13.status-warning.enum';
import { NoteWarningDto } from './note-warning.dto';

export default class CreateWarningDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly idDevice: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  readonly idSettingOrError: Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(TypeWarningEnum)
  readonly typeWarning: TypeWarningEnum = TypeWarningEnum.DEVICEERROR;

  @IsNotEmpty()
  @IsNumber()
  readonly time: number;

  @IsNotEmpty()
  @IsEnum(StatusWarningEnum)
  readonly status: StatusWarningEnum = StatusWarningEnum.WAIT;

  @IsOptional()
  @Type(() => NoteWarningDto)
  // @ValidateNested()
  readonly notes: NoteWarningDto[] = [
    {
      status: StatusWarningEnum.WAIT,
      description: '',
    },
    {
      status: StatusWarningEnum.DOING,
      description: '',
    },
    {
      status: StatusWarningEnum.COMPLETE,
      description: '',
    },
  ];
}
