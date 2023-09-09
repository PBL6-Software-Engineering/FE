import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import HistoryLostConnectController from './history-lost-connect.controller';
import HistoryLostConnectRepository from './history-lost-connect.repository';
import HistoryLostConnectService from './history-lost-connect.service';
import { HistoryLostConnect, HistoryLostConnectSchema } from './schemas/history-lost-connect.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HistoryLostConnect.name,
        schema: HistoryLostConnectSchema
      }
    ])
  ],
  controllers: [HistoryLostConnectController],
  providers: [HistoryLostConnectService, HistoryLostConnectRepository],
  exports: [HistoryLostConnectService, HistoryLostConnectRepository]
})
export default class HistoryLostConnectModule {}
