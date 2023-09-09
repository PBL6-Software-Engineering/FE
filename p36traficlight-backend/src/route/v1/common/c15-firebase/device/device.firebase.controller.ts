import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeviceFirebaseRefService } from './device.firebaseRef';

@ApiTags('Firebase')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class DeviceFirebaseController {
  constructor(
    private readonly deviceFirebaseRefService: DeviceFirebaseRefService,
  ) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('devices')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.deviceFirebaseRefService.getValues();
    return result;
  }

  /**
   * Create
   *
   * @param body
   * @returns
   */
  @Post('devices')
  @HttpCode(201)
  async create(@Body() body: any): Promise<any> {
    const id = this.makeID(5);
    const result = await this.deviceFirebaseRefService.create(id, body);

    return result;
  }

  /**
   * Get by id
   *
   * @param id
   * @returns
   */
  @Get('devices/:id')
  // @HttpCode(204)
  async getById(@Param('id') id: string): Promise<any> {
    return this.deviceFirebaseRefService.getValueById(id);
  }

  /**
   * Update by id
   *
   * @param id
   * @returns
   */
  @Put('devices/:id')
  // @HttpCode(204)
  async updateByID(@Param('id') id: string, @Body() body: any): Promise<any> {
    return this.deviceFirebaseRefService.updateById(id, body);
  }

  /**
   * Delete by id
   *
   * @param id
   * @returns
   */
  @Delete('devices/:id')
  // @HttpCode(204)
  async deleteManyById(@Param('id') id: string): Promise<any> {
    return this.deviceFirebaseRefService.removeById(id);
  }

  /**
   * Make id
   *
   * @param length
   * @returns
   */
  makeID(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const charactersLength = characters.length;

    let counter = 0;

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
  }
}
