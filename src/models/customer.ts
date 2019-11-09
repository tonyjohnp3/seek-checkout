import mongoose, { Schema, Document, Types } from 'mongoose';

export interface CustomerDoc extends Customer, Document {
  _id: Types.ObjectId;
}

export interface Customer {
  name: string;
}

const CustomerSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true, unique: true },
});

export default class CustomerModel {
  private customerModel: mongoose.Model<CustomerDoc>;

  constructor() {
    this.customerModel = mongoose.model<CustomerDoc>('Customer', CustomerSchema);
  }

  async insert(customers: Customer[]): Promise<CustomerDoc[]> {
    return this.customerModel.insertMany(customers);
  }

  async getCustomers(): Promise<CustomerDoc[]> {
    return this.customerModel.find();
  }

  async getCustomerById(id: Types.ObjectId): Promise<CustomerDoc> {
    return this.customerModel.findById(id);
  }

  async customerExists(id: Types.ObjectId): Promise<boolean> {
    try {
      const customer = await this.customerModel.findById(id, '_id');
      return customer ? true : false;
    } catch (err) {
      return false;
    }
  }
}