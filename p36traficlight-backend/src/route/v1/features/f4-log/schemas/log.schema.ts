/* eslint-disable linebreak-style */
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Log {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  readonly idUser: string;

  @Prop({ type: Number, default: 0 })
  readonly accessTime: number;

  @Prop({ type: String, default: '' })
  readonly action: string;

  @Prop({ type: String, default: '' })
  readonly description: string;

  @Prop({ type: String, default: '' })
  readonly ip: string;
}

export type LogDocument = Log & Document;
export const LogSchema = SchemaFactory.createForClass(Log);
