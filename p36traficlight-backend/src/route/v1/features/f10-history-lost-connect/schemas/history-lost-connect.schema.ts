import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class HistoryLostConnect {
    @Prop({ type: Types.ObjectId, ref: 'Device' })
    readonly idDevice: ObjectId;

    @Prop({ type: Number, default: 0 })
    readonly timeLostConnect: number;

    @Prop({ type: Number, default: 0 })
    readonly timeReconnect: number;
}

export type HistoryLostConnectDocument = HistoryLostConnect & Document;
export const HistoryLostConnectSchema = SchemaFactory.createForClass(HistoryLostConnect);
