import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class HistoryData {
    @Prop({ type: Types.ObjectId, ref: 'Device' })
    readonly idDevice: ObjectId;

    @Prop({ type: Number, default: 0 })
    readonly voltage: number;

    @Prop({ type: Number, default: 0 })
    readonly wattage: number;

    @Prop({ type: Number, default: 0 })
    readonly temperature: number;

    @Prop({ type: Number, default: 0 })
    readonly amperage: number;

    @Prop({ type: Number, default: 0 })
    readonly time: number;

    @Prop({ type: String, default: '' })
    readonly status: string;
}

export type HistoryDataDocument = HistoryData & Document;
export const HistoryDataSchema = SchemaFactory.createForClass(HistoryData);
