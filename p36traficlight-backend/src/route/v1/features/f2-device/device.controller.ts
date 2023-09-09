import { Types } from 'mongoose';

import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import { commonHelper } from 'src/util/helper/common.helper';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';

import { ObjectId } from 'mongodb';

import { DataSendDeviceType } from 'src/util/types/dataSendDevice.type';
import CreateDeviceDto from './dto/create-device.dto';
import UpdateDeviceDto from './dto/update-device.dto';
import DeviceService from './device.service';
import DeviceTcpService from './device.tcp.service';

const net = require('net');

@ApiTags('Devices')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class DeviceController {
  constructor(private readonly deviceService: DeviceService,
              private readonly deviceTcpService: DeviceTcpService) {}

  /**
   * Find by group
   *
   * @param query
   * @returns
   */
  @Get('findByGroup')
  @HttpCode(200)
  async findByGroup(@Query() query: any): Promise<any> {
    const result = await this.deviceService.findByGroup(query);
    return result;
  }

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.deviceService.findManyBy(query);
    return result;
  }

  /**
    * sendAndReceiveData
    * @returns
  */
  @Post('sendAndReceiveData')
  @HttpCode(200)
  async sendAndReceiveData(@Body() body: DataSendDeviceType): Promise<any> {
    if (body.port < 0) {
      if (body.host === '') {
        throw new BadRequestException('Chưa thiết lập ip và port thiết bị!');
      } else {
        throw new BadRequestException('Chưa thiết lập port thiết bị!');
      }
    }
    if (body.host === '') {
      throw new BadRequestException('Chưa thiết lập ip thiết bị!');
    }
    const decimals: number[] = body.data;
    if (!commonHelper.isValidChecksum(decimals)) {
      throw new BadRequestException('Dữ liệu không hợp lệ!');
    }
    const dataHexans = commonHelper.convertDecToHex(decimals);
    const result = await this.deviceTcpService.sendAndReceiveData(body.port, body.host, dataHexans);
    return result;
  }

  /**
   * Create
   *
   * @param query
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Query() query: any, @Body() body: CreateDeviceDto): Promise<any> {
    const { idGroup } = query;
    if (idGroup) {
      const device = await this.deviceService.createDevice(idGroup, body);
      return device;
    }
    const group = await this.deviceService.createGroup(body);
    return group;
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
    @Query() query: any,
    @Body() body: UpdateDeviceDto,
  ): Promise<any> {
    const { idGroup } = query;
    // update device
    if (idGroup && !body.isGroup) {
      const result = await this.deviceService.updateDevice(idGroup, id, body);
      return result;
    }
    // update group
    if (!idGroup && body.isGroup) {
      const result = await this.deviceService.updateGroup(id, body);
      return result;
    }
    return null;
  }

  /**
   * Delete device in group
   *
   * @returns
   */
  @Post('updateChildGroup')
  // @HttpCode(204)
  async updateChildGroup(@Body() body: any): Promise<any> {
    const { idsGroup, idsDevice } = body;

    const listIdGroup = idsGroup.split(',');
    const listTextIdDevice = idsDevice.split(';');

    const results = [];
    for (let i = 0; i < listIdGroup.length; i += 1) {
      results.push(this.deviceService.updateChildGroup(listIdGroup[i], listTextIdDevice[i].split(',')));
    }
    return await Promise.all(results);
  }

  /**
   * Delete device in group
   *
   * @returns
   */
  @Delete('deleteDeviceInGroup')
  // @HttpCode(204)
  async deleteDeviceInGroup(@Query() query: any): Promise<any> {
    const { idGroup, idDevice } = query;
    // delete device
    const result = await this.deviceService.deleteOneHardById(new ObjectId(idDevice));
    const group = await this.deviceService.findOneById(new ObjectId(idGroup));
    // remove idDevice from childs of group
    if (group) {
      group.childs = group.childs.filter((item: any) => item.toString() !== idDevice);
      this.deviceService.updateOneById(group._id, group);
    }
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
    const result = await this.deviceService.deleteManyHardByIds(ids.split(','));
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
    const result = await this.deviceService.deleteOneHardById(id);
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
   async paginate(@Query() query: any): Promise<any> {
     const conditions: any[] = [{ isGroup: true }];
     if (query.idProvince) {
       conditions.push({ idProvince: query.idProvince });
     }
     if (query.idTypeDevice) {
       conditions.push({ idTypeDevice: query.idTypeDevice });
     }
     const queryPaginate = {
       filter: {
         $and: conditions
       },
       population: [
         {
           path: 'childs',
           populate: {
             path: 'idTypeDevice'
           },
           options: { sort: { position: 1 } }
         },
         { path: 'idTypeDevice' },
         { path: 'idProvince' },
       ],
       skip: query.page,
       limit: query.limit,
     };
     return this.deviceService.paginate(queryPaginate);
   }

  /**
   * findByDeviceCode
   *
   * @param deviceCode
   * @returns
   */
    @Get('findByDeviceCode/:deviceCode')
    @HttpCode(200)
  async findByDeviceCode(@Param('deviceCode') deviceCode: string): Promise<any> {
    const result = await this.deviceService.findOneBy({ deviceCode });
    return result;
  }

    /**
   * testSendFirmware
   */
    @Get('testSendFirmware')
    @HttpCode(200)
    async testSendFirmware(): Promise<any> {
      function sleep(ms: any) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
      await sleep(10000);
      return true;
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
      const result = await this.deviceService.findOneById(id, { populate });

      if (!result) throw new NotFoundException('The item does not exist');
      if (result.isLock) {
        throw new BadRequestException('Thiết bị đã bị khoá');
      }
      return result;
    }

  /**
   * Find group by ID
   *
   * @param id
   * @returns
   */
  @Get('findByGroup/:id')
  @HttpCode(200)
  async findGroupById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const result = await this.deviceService.findGroupById(id);

    if (!result) throw new NotFoundException('The item does not exist');
    if (result.isLock) {
      throw new BadRequestException('Thiết bị đã bị khoá');
    }
    return result;
  }

  /**
   * Find group by ID
   *
   * @param id
   * @returns
   */
  @Get('changeStatusLock/:id/:isLock')
  @HttpCode(200)
  async changeStatusLock(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Param('isLock', ParseBoolPipe) isLock: boolean,
  ): Promise<any> {
    const result = await this.deviceService.findOneById(id);
    result.isLock = isLock;
    await this.deviceService.updateOneById(id, result);
    return result;
  }
}
