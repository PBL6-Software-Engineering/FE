import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Log, LogSchema } from './schemas/log.schema';
import LogController from './log.controller';
import LogRepository from './log.repository';
import LogService from './log.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: LogSchema,
      },
    ]),
  ],
  controllers: [LogController],
  providers: [LogService, LogRepository],
  exports: [LogService, LogRepository],
})
export default class LogModule {}
