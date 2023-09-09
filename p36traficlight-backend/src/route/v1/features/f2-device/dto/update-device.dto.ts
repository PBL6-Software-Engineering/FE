import { PartialType } from '@nestjs/mapped-types';

import CreateDeviceDto from './create-device.dto';

export default class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
