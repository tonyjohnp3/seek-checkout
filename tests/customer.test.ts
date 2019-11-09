import { seedCustomers } from './seed/seeder';
import { connectDb } from '../src/db/mongodb';
import CustomerModel from '../src/models/customer';
import { ObjectId } from 'bson';

describe('Test Customer Model', () => {
  beforeAll(async () => {
    connectDb();
    try {
      const res = await seedCustomers();
    } catch (err) {
      console.log('Error:', err);
    }
  });

  describe('getCustomers()', () => {
    it('should return array of 4 customers', async () => {
      const customerModel = new CustomerModel();
      const res = await customerModel.getCustomers();
      expect(Array.isArray(res)).toBe(true);
      expect(res).toHaveLength(4);
    });
  });

  describe('customerExists()', () => {
    it('should return true for existing document', async () => {
      const customerModel = new CustomerModel();
      const res = await customerModel.getCustomers();
      expect(await customerModel.customerExists(res[0]._id)).toBe(true);
    });
  
    it('should return false for non-existing document', async () => {
      const customerModel = new CustomerModel();
      expect(await customerModel.customerExists(new ObjectId('234234234acdbe2234341231'))).toBe(false);
    });
  });
});