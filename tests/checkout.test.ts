import Checkout, { Rule, RuleType } from '../src/models/checkout';
import AdModel from '../src/models/ad';
import { connectDb } from '../src/db/mongodb';
import { seedAds } from './seed/seeder';
import { Types } from 'mongoose';

describe('Test Checkout Class', () => {
  beforeAll(async () => {
    connectDb();
    try {
      let res= await seedAds();
    } catch (err) {
      console.log('Error:', err);
    }
  });

  describe('add()', () => {
    it('should add item to items array', async () => {
      const adModel = new AdModel();
      const ads = await adModel.getAds();
      const checkout = new Checkout();
      await checkout.add(ads[0]._id);
      const items = checkout.getItems();
      expect(items).toBeInstanceOf(Map);
      expect(items.size).toBe(1);
    });
  });

  describe('total()', () => {
    it('should return the correct total of items = 987.97, when default customer orders classic, standout and premium ads', async () => {
      const adModel = new AdModel();
      const ads = await adModel.getAds();
      const checkout = new Checkout();
      // ads.forEach(async (ad) => {
      //   console.log(ad.price);
      //   await checkout.add(ad._id);
      // });
      await checkout.add(ads[0]._id);
      await checkout.add(ads[1]._id);
      await checkout.add(ads[2]._id);
      expect(checkout.total()).toBe(987.97);
    });

    it('should return the correct total of items = 934.97, when second bite customer orders classic, classic, classic and premium ads with 3 for 2 on classic ads', async () => {
      const adModel = new AdModel();
      const ads = await adModel.getAds();
      let pricingRules: Map<string, Rule> = new Map();
      pricingRules.set(ads[0].name, {
        type: RuleType.BulkFor,
        priceFor: 2,
        quantity: 3 
      });
      const checkout = new Checkout(pricingRules);
      await checkout.add(ads[0]._id);
      await checkout.add(ads[0]._id);
      await checkout.add(ads[0]._id);
      await checkout.add(ads[2]._id);
      expect(checkout.total()).toBe(934.97);
    });

    it('should return the correct total of items = 1294.96, when axil coffee roasters order standout, standout, standout, and premium ads with 23$ discount on standout ads', async () => {
      const adModel = new AdModel();
      const ads = await adModel.getAds();
      let pricingRules: Map<string, Rule> = new Map();
      pricingRules.set(ads[1].name, {
        type: RuleType.DiscountAmount,
        amount: 23
      });
      const checkout = new Checkout(pricingRules);
      await checkout.add(ads[1]._id);
      await checkout.add(ads[1]._id);
      await checkout.add(ads[1]._id);
      await checkout.add(ads[2]._id);
      expect(checkout.total()).toBe(1294.96);
    });

    it('should return the correct total of items = 1951.94, when MYER order standout, standout, standout, standout, standout, classic and premium ads with 5$ discount on premium ads and 5 for 4 on standout ads', async () => {
      const adModel = new AdModel();
      const ads = await adModel.getAds();
      let pricingRules: Map<string, Rule> = new Map();
      pricingRules.set(ads[2].name, {
        type: RuleType.DiscountAmount,
        amount: 5
      });
      pricingRules.set(ads[1].name, {
        type: RuleType.BulkFor,
        priceFor: 4,
        quantity: 5 
      });
      const checkout = new Checkout(pricingRules);
      await checkout.add(ads[1]._id);
      await checkout.add(ads[1]._id);
      await checkout.add(ads[1]._id);
      await checkout.add(ads[1]._id);
      await checkout.add(ads[1]._id);
      await checkout.add(ads[0]._id);
      await checkout.add(ads[2]._id);
      expect(checkout.total()).toBe(1951.94);
    });
  });
});