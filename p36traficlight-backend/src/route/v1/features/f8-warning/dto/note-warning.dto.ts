import { IsOptional, IsString, IsEnum } from 'class-validator';
import { StatusWarningEnum } from '@enum/13.status-warning.enum';

export class NoteWarningDto {
  @IsOptional()
  @IsEnum(StatusWarningEnum)
  status: StatusWarningEnum;

  @IsOptional()
  @IsString()
  description: string;
}
