import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Controller,
  Get,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import HistoryLostConnectService from './history-lost-connect.service';

@ApiTags('HistoryLostConnects')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class HistoryLostConnectController {
  constructor(private readonly historyLostConnectService: HistoryLostConnectService,) {}

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.historyLostConnectService.paginate(query);
  }
}
