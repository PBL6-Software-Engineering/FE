import { IsBoolean, IsOptional } from 'class-validator';

import { OmitType, PartialType } from '@nestjs/mapped-types';

import CreateUserDto from './create-user.dto';

export default class UpdateUserDto extends PartialType(
  CreateUserDto
) {
  @IsOptional()
  @IsBoolean()
  deleted?: boolean;

  @IsOptional()
  @IsBoolean()
  isActived?: boolean;
}
