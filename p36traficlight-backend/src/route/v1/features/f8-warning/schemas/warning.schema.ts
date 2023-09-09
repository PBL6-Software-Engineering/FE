import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { StatusWarningEnum } from '@enum/13.status-warning.enum';
import { TypeWarningEnum } from '@enum/type-warning.enum';

@Schema({ timestamps: true, versionKey: false })
export class Warning {
  @Prop({ type: Types.ObjectId, ref: 'Device' })
  readonly idDevice: string;

  @Prop({ type: Number, default: 0 })
  readonly time: number;

  @Prop({ type: Number, enum: StatusWarningEnum, default: StatusWarningEnum.WAIT })
  readonly status: number;

  @Prop({
    type: [{
      status: { type: StatusWarningEnum, default: StatusWarningEnum.WAIT },
      description: { type: String },
    }],
  })
  readonly notes: {status: StatusWarningEnum, description: string}[];

  @Prop({ type: Types.ObjectId, refPath: 'typeWarning' })
  readonly idSettingOrError: string;

  @Prop({ type: TypeWarningEnum, default: TypeWarningEnum.DEVICEERROR, required: true })
  readonly typeWarning: {
    type: String,
    required: true,
    enum: ['DeviceError', 'CommonSetting']
  };
}

export type WarningDocument = Warning & Document;
export const WarningSchema = SchemaFactory.createForClass(Warning);
