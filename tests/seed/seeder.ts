import AdModel from '../../src/models/ad';
import CustomerModel from '../../src/models/customer';
import { ads, customers } from './data';

export const seedAds = async (): Promise<boolean> => {
  try {
    const adModel = new AdModel();
    await adModel.insert(ads);
    return true;
  } catch (err) {
    return false;
  }
};

export const seedCustomers = async (): Promise<boolean> => {
  try {
    const customerModel = new CustomerModel();
    await customerModel.insert(customers);
    return true;
  } catch (err) {
    return false;
  }
};