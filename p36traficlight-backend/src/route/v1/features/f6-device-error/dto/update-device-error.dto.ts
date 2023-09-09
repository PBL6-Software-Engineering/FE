import { PartialType } from '@nestjs/mapped-types';

import CreateDeviceErrorDto from './create-device-error.dto';

export default class UpdateDeviceErrorDto extends PartialType(CreateDeviceErrorDto) {}
