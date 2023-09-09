import { PartialType } from '@nestjs/mapped-types';

import CreateTypeDeviceDto from './create-type-device.dto';

export default class UpdateTypeDeviceDto extends PartialType(CreateTypeDeviceDto) {}
