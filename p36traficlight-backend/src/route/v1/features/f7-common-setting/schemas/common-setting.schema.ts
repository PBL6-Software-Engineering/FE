import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class CommonSetting {
  @Prop({ type: String, default: '' })
  readonly name: string;

  @Prop({ type: String, default: '' })
  readonly type: string;

  @Prop({ type: Number, default: 0 })
  readonly numberTime: number;

  @Prop({ type: String, default: '' })
  readonly unitTime: string;

  @Prop({ type: Boolean, default: true })
  readonly isShow: boolean;
}

export type CommonSettingDocument = CommonSetting & Document;
export const CommonSettingSchema = SchemaFactory.createForClass(CommonSetting);
