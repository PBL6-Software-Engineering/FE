import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class TypeDevice {
  @Prop({ type: String, default: '' })
  readonly name: string;

  @Prop({ type: String, default: '' })
  readonly thumbnail: string;

  @Prop({ type: String, default: '' })
  readonly image: string;
}

export type TypeDeviceDocument = TypeDevice & Document;
export const TypeDeviceSchema = SchemaFactory.createForClass(TypeDevice);
