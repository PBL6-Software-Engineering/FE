import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Controller,
  Get,
  HttpCode,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import HistoryDataService from './history-data.service';

@ApiTags('HistoryDatas')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class HistoryDataController {
  constructor(private readonly historyDataService: HistoryDataService,) {}

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('findByIdDevice')
  @HttpCode(200)
  async idDevice(@Query('idDevice') idDevice: any): Promise<any> {
    return this.historyDataService.findOneBy({ idDevice });
  }
}
