import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Configuration {
  @Prop({ type: Types.ObjectId, ref: 'Device' })
  readonly idDevice: string;

  @Prop({ type: Number, default: 0 })
  readonly position: number;

  @Prop({ type: String, default: '' })
  readonly parameter: string;

  @Prop({ type: Number, default: 0 })
  readonly byte: number;

  @Prop({ type: Number, default: 0 })
  readonly value: number;
}

export type ConfigurationDocument = Configuration & Document;
export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
