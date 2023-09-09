import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import HistoryDataController from './history-data.controller';
import HistoryDataRepository from './history-data.repository';
import HistoryDataService from './history-data.service';
import { HistoryData, HistoryDataSchema } from './schemas/history-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HistoryData.name,
        schema: HistoryDataSchema
      }
    ])
  ],
  controllers: [HistoryDataController],
  providers: [HistoryDataService, HistoryDataRepository],
  exports: [HistoryDataService, HistoryDataRepository]
})
export default class HistoryDataModule {}
