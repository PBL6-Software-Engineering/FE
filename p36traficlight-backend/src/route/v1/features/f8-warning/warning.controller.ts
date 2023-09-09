import DeviceService from '@features/f2-device/device.service';
import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import CommonSettingService from '@features/f7-common-setting/common-setting.service';
import DeviceErrorService from '@features/f6-device-error/device-error.service';
import CreateWarningDto from './dto/create-warning.dto';
import UpdateWarningDto from './dto/update-warning.dto';
import WarningService from './warning.service';

@ApiTags('Warnings')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class WarningsController {
  constructor(private readonly warningService: WarningService,
              private readonly deviceService: DeviceService,
              private readonly commonSettingService: CommonSettingService,
              private readonly deviceErrorService: DeviceErrorService) { }

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.warningService.findManyBy(query);
    return result;
  }

  /**
   * Create
   *
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateWarningDto): Promise<any> {
    const result = await this.warningService.create(body);
    return result;
  }

  /**
   * Update by ID
   *
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateWarningDto,
  ): Promise<any> {
    const result = await this.warningService.updateOneById(id, body);

    return result;
  }

  /**
   * Delete hard many by ids
   *
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const result = await this.warningService.deleteManyHardByIds(ids.split(','));
    return result;
  }

  /**
   * Delete by ID
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const result = await this.warningService.deleteOneHardById(id);

    return result;
  }

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto, @Query('idProvince') idProvince: string = '',
                 @Query('typeWarning') typeWarning: string = ''): Promise<any> {
    let { filter }: { filter: any } = query;

    // lấy ra những id của Device có isGroup = true có trong collection Device
    const listAllDevice = await this.deviceService.findManyBy({ isGroup: true });
    const idDevices: string[] = [];
    listAllDevice.forEach((item: any) => {
      idDevices.push(String(item._id));
    });

    // lấy ra những id có trong collection CommonSetting và DeviceError

    const listAllcommonSetting = await this.commonSettingService.findManyBy();
    const deviceErrors = await this.deviceErrorService.findManyBy();
    const idSettingOrErrors: string[] = [];
    listAllcommonSetting.forEach((item: any) => {
      idSettingOrErrors.push(String(item._id));
    });

    deviceErrors.forEach((item: any) => {
      idSettingOrErrors.push(String(item._id));
    });

    // chỉ lấy ra những warning mà có idDevice, idSettingOrError tồn tại trong collection
    // Device, CommonSetting và DeviceError
    filter = {
      ...filter,
      idSettingOrError: { $in: idSettingOrErrors },
      idDevice: { $in: idDevices },
    };

    // nếu cảnh báo là Lỗi
    if (typeWarning === 'Lỗi') {
      filter = {
        ...filter,
        typeWarning: 'DeviceError',
      };
    } else if (typeWarning !== '' && typeWarning !== 'Lỗi') {
      const commonSettings = await this.commonSettingService.findManyBy({ type: typeWarning });
      const idCommonSettings: string[] = [];
      commonSettings.forEach((c: any) => {
        const idString = String(c._id);
        idCommonSettings.push(idString);
      });
      filter = {
        ...filter,
        idSettingOrError: { $in: idCommonSettings }
      };
      delete filter.typeWarning;
    }

    // nếu tồn tại idProvince trong filter
    if (idProvince !== '') {
      const devices = await this.deviceService.findManyBy({ idProvince });
      const ids: string[] = [];
      devices.forEach((d: any) => {
        const idString = String(d._id);
        ids.push(idString);
      });
      filter = {
        ...filter,
        idDevice: { $in: ids }
      };
      delete filter.idProvince;
    }

    return this.warningService.paginate({ ...query, filter });
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams('population') populate: AqpDto,
  ): Promise<any> {
    const result = await this.warningService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
