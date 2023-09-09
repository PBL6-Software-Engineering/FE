import { PartialType } from '@nestjs/mapped-types';

import CreateSettingDto from './create-common-setting.dto';

export default class UpdateSettingDto extends PartialType(CreateSettingDto) {}
