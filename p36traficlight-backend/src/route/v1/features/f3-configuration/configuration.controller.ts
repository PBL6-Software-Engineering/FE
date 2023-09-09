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

import DeviceService from '@features/f2-device/device.service';
import { ObjectId } from 'mongodb';
import CreateConfigurationDto from './dto/create-configuration.dto';
import UpdateConfigurationDto from './dto/update-configuration.dto';
import ConfigurationService from './configuration.service';

@ApiTags('Configurations')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService,
              private readonly deviceService: DeviceService,) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.configurationService.findManyBy(query);
    return result;
  }

    /**
   * Create
   *
   * @param body
   * @returns
   */
    @Post('deleteAndInsertMany')
    @HttpCode(201)
  async deleteAndInsertMany(@Body() body: CreateConfigurationDto[]): Promise<any> {
    // find device for update status configuration
    const device = await this.deviceService.findOneBy({ _id: body[0].idDevice });
    // if device is not configuration then update status isConfiguration equals true
    if (!device.isConfiguration) {
      device.isConfiguration = true;
      await this.deviceService.updateOneById(device._id, device);
    }
    // delete many old record where idDevice
    await this.configurationService.deleteManyHard({ idDevice: device._id.toString() });
    // insert many new record
    const result = await this.configurationService.insertMany(body);
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
    async create(@Body() body: CreateConfigurationDto): Promise<any> {
    // find device for update status configuration
      const device = await this.deviceService.findOneBy({ _id: body.idDevice });
      // if device is not configuration then update status isConfiguration equals true
      if (!device.isConfiguration) {
        device.isConfiguration = true;
        await this.deviceService.updateOneById(device._id, device);
      }
      // find last position using to auto increment position
      const configurations = await this.configurationService.findManyBy({ idDevice: body.idDevice });
      const data: any = body;
      // if device is not configured then initial position equal 1 else position = last position + 1
      data.position = configurations.length === 0 ? 1 : configurations[configurations.length - 1].position + 1;
      const result = await this.configurationService.create(data);
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
    @Body() body: UpdateConfigurationDto,
  ): Promise<any> {
    const result = await this.configurationService.updateOneById(id, body);

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
  async deleteManyByIds(@Param('ids') ids: string, @Query() query: any): Promise<any> {
    const result = await this.configurationService.deleteManyHardByIds(ids.split(','));

    // get configurations using for update isConfiguration
    const { idDevice } = query;
    const configurations = await this.configurationService.findOneBy({ idDevice });
    // if delete all configuration then status isConfiguration = false
    if (!configurations) {
      const device = await this.deviceService.findOneById(new ObjectId(idDevice));
      device.isConfiguration = false;
      this.deviceService.updateOneById(idDevice, device);
    }
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
    const result = await this.configurationService.deleteOneHardById(id);
    // get configurations using for update isConfiguration
    const idDevice = result?.idDevice;
    const configurations = await this.configurationService.findOneBy({ idDevice });
    // if delete all configuration then status isConfiguration = false
    if (!configurations) {
      const device = await this.deviceService.findOneById(new ObjectId(idDevice));
      device.isConfiguration = false;
      this.deviceService.updateOneById(idDevice, device);
    }
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
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.configurationService.paginate(query);
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
    const result = await this.configurationService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
