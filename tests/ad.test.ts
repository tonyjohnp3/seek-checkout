import { seedAds } from './seed/seeder';
import { connectDb } from '../src/db/mongodb';
import AdModel from '../src/models/ad';
import { ObjectId } from 'bson';

describe('Test Ad Model', () => {
  beforeAll(async () => {
    connectDb();
    try {
      let res= await seedAds();
    } catch (err) {
      console.log('Error:', err);
    }
  });
  
  describe('getAds()', () => {
    it('should return array of 3 ads', async () => {
      const adModel = new AdModel();
      const res = await adModel.getAds();
      expect(Array.isArray(res)).toBe(true);
      expect(res).toHaveLength(3);
    });
  });

  describe('adExists()', () => {
    it('should return true for existing document', async () => {
      const adModel = new AdModel();
      const res = await adModel.getAds();
      expect(await adModel.adExists(res[0]._id)).toBe(true);
    });
  
    it('should return false for non-existing document', async () => {
      const adModel = new AdModel();
      expect(await adModel.adExists(new ObjectId('234234234acdbe2234341231'))).toBe(false);
    });
  });
});