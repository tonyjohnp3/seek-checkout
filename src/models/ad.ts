import mongoose, { Schema, Document, Types } from 'mongoose';

export interface AdDoc extends Ad, Document {
  _id: Types.ObjectId;
}

export interface Ad {
  name: string;
  description?: string;
  price?: number;
}

const AdSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true, unique: true, dropDups: true },
  description: { type: String },
  price: { type: Number }
});

export default class AdModel {
  private adModel: mongoose.Model<AdDoc>;

  constructor() {
    this.adModel = mongoose.model<AdDoc>('Ad', AdSchema);
  }

  insert(ads: Ad[]): Promise<AdDoc[]> {
    return this.adModel.insertMany(ads);
  }
  
  async getAds(): Promise<AdDoc[]> {
    return this.adModel.find();
  }

  async getAdById(id: Types.ObjectId): Promise<AdDoc> {
    return this.adModel.findById(id).exec();
  }

  async adExists(id: Types.ObjectId): Promise<boolean> {
    try {
      const ad = await this.adModel.findById(id, '_id');
      return ad ? true : false;
    } catch (err) {
      return false;
    }
  }
}