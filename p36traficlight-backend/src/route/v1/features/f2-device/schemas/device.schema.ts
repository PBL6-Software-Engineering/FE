import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoordinatesType } from 'src/util/types/coordinates.type';
import { ObjectId } from 'mongodb';

@Schema({ timestamps: true, versionKey: false })
export class Device {
  @Prop({ type: Types.ObjectId, ref: 'TypeDevice' })
  readonly idTypeDevice: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  readonly idProvince: ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Device' }], default: [] })
  readonly childs: ObjectId[];

  @Prop({ type: String, default: '' })
  readonly name: string;

  @Prop({ type: String, default: '' })
  readonly deviceCode: string;

  @Prop({ type: String, default: '' })
  readonly ip: string;

  @Prop({ type: Number, default: -1 })
  readonly port: number;

  @Prop({ type: { lat: Number, lng: Number }, default: {} })
  readonly coordinate: CoordinatesType;

  @Prop({ type: Number, default: -1 })
  readonly position: number;

  @Prop({ type: Boolean })
  readonly isGroup: boolean;

  @Prop({ type: Boolean, default: false })
  readonly isLock: boolean;

  @Prop({ type: Boolean, default: false })
  readonly isConfiguration: boolean;

  @Prop({ type: Number, default: 0 })
  readonly numberLostConnect: number;
}

export type DeviceDocument = Device & Document;
export const DeviceSchema = SchemaFactory.createForClass(Device);
