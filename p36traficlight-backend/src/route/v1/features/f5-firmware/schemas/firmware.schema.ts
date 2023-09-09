/* eslint-disable linebreak-style */
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Firmware {
  @Prop({ type: String, default: '' })
  readonly nameModel: string;

  @Prop({ type: String, default: '' })
  readonly version: string;

  @Prop({ type: Number, default: 0 })
  readonly dateRelease: number;

  @Prop({
    type: {
      lat: { type: String, default: '' },
      long: { type: String, default: '' },
    },
  })
  latLong: { lat: string; long: string };

  @Prop(
    {
      type: {
        url: { type: String, default: '' },
        name: { type: String, default: '' },
        lastModified: { type: Number, default: 0 },
      },
    }
  )
  readonly file: { url: string; name: string; lastModified: number };

  @Prop({ type: String, default: '' })
  readonly description: string;
}

export type FirmwareDocument = Firmware & Document;
export const FirmwareSchema = SchemaFactory.createForClass(Firmware);
