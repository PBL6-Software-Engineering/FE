import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FileFirmwareDto {
  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  lastModified: number;
}
