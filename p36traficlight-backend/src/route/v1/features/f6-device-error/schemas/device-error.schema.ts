/* eslint-disable linebreak-style */
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class DeviceError {
  @Prop({ type: String, ref: '' })
  readonly name: string;

  @Prop({ type: Number, default: 1, unique: true })
  readonly code: number;

  @Prop({ type: String, default: '' })
  readonly reason: string;

  @Prop({ type: String, default: '' })
  readonly description: string;
}

export type DeviceErrorDocument = DeviceError & Document;
export const DeviceErrorSchema = SchemaFactory.createForClass(DeviceError);
