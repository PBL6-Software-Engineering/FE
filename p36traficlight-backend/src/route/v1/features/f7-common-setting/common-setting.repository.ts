import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CommonSetting, CommonSettingDocument } from './schemas/common-setting.schema';

@Injectable()
export default class CommonSettingRepository extends BaseRepository<CommonSettingDocument> {
  constructor(@InjectModel(CommonSetting.name) model: PaginateModel<CommonSettingDocument>) {
    super(model);
  }
}
