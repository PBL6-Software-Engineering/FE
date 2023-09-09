import { PartialType } from '@nestjs/mapped-types';

import CreateFirmwareDto from './create-firmware.dto';

export default class UpdateFirmwareDto extends PartialType(CreateFirmwareDto) {}
