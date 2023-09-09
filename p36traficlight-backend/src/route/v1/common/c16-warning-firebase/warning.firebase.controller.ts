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
import { WarningFirebaseRefService } from './warning.firebaseRef';

@ApiTags('WarningFirebases')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class WarningFirebaseController {
  constructor(
    private readonly warningFirebaseRefService: WarningFirebaseRefService,
  ) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('warnings')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.warningFirebaseRefService.getValues();
    return result;
  }

  /**
   * Create
   *
   * @param body
   * @returns
   */
  @Post('warnings')
  @HttpCode(201)
  async create(@Body() body: any): Promise<any> {
    const id = this.makeID(5);
    const result = await this.warningFirebaseRefService.create(id, body);

    return result;
  }

  /**
   * Get by id
   *
   * @param id
   * @returns
   */
  @Get('warnings/:id')
  // @HttpCode(204)
  async getById(@Param('id') id: string): Promise<any> {
    return this.warningFirebaseRefService.getValueById(id);
  }

  /**
   * Update by id
   *
   * @param id
   * @returns
   */
  @Put('warnings/:id')
  // @HttpCode(204)
  async updateByID(@Param('id') id: string, @Body() body: any): Promise<any> {
    return this.warningFirebaseRefService.updateById(id, body);
  }

  /**
   * Delete by id
   *
   * @param id
   * @returns
   */
  @Delete('warnings/:id')
  // @HttpCode(204)
  async deleteManyById(@Param('id') id: string): Promise<any> {
    return this.warningFirebaseRefService.removeById(id);
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
