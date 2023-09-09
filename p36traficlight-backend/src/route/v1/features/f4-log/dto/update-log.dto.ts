import { PartialType } from '@nestjs/mapped-types';

import CreateLogDto from './create-log.dto';

export default class UpdateLogDto extends PartialType(CreateLogDto) {}
