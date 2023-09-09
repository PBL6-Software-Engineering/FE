import { PaginateModel, Model } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Configuration, ConfigurationDocument } from './schemas/configuration.schema';

@Injectable()
export default class ConfigurationRepository extends BaseRepository<ConfigurationDocument> {
  constructor(@InjectModel(Configuration.name) model: PaginateModel<ConfigurationDocument>,
  @InjectModel(Configuration.name) private configurationModel: Model<ConfigurationDocument>) {
    super(model);
  }

  async insertMany(data: any[]): Promise<any | null> {
    return this.configurationModel.insertMany(data);
  }
}
