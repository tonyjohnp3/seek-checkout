import mongoose, { Types, Mongoose } from 'mongoose';
import AdModel, { Ad } from './ad';

export interface ItemQuantity extends Ad {
  quantity: number;
}

export enum RuleType {
  DiscountAmount,
  DiscountPercent,
  BulkFor,
  BulkDiscountAmount,
  BulkDiscountPercent
}

export interface Rule {
  type: RuleType;
  amount?: number;
  priceFor?: number;
  quantity?: number;
}

export default class Checkout {
  private items: Map<string, ItemQuantity>;
  public pricingRules: Map<string, Rule>;

  constructor(pricingRules?: Map<string, Rule>) {
    this.items = new Map();
    this.pricingRules = pricingRules ? pricingRules : new Map(); 
  }

  getItems(): Map<string, ItemQuantity> {
    return this.items;
  }

  async add(itemId: Types.ObjectId) {
    try {
      const adModel = new AdModel();
      const item = await adModel.getAdById(itemId);
      if (item) {
        const { name, description, price } = item;
        if (this.items.get(name)) {
          this.items.set(name, { ...this.items.get(name), quantity: ++this.items.get(name).quantity });
        } else {
          this.items.set(name, { name, description, price, quantity: 1 });
        }
        // this.items.set(_id, (this.items.get(_id) ? { ...this.items.get(_id), quantity: this.items.get(_id).quantity++  } : { ...item, quantity: 1 }));
      }
    } catch (err) {
      console.error('Add item failed', err);
    }
  }

  total(): number {
    // return this.items.reduce((total, item) => (total + item.price), 0);
    let total: number = 0;
    for (let item of this.items.values()) {
      total += Checkout.calcTotalWithDiscount(item, this.pricingRules.get(item.name));
    }
    return total;
  }

  static calcTotalWithDiscount(item: ItemQuantity, rule: Rule | undefined): number {
    let total = item.price * item.quantity;
    if (!rule) {
      return total;
    }
    switch(rule.type) {
      case RuleType.DiscountAmount:
        total -= item.quantity * rule.amount;   
        break;
      case RuleType.BulkFor:
        if (item.quantity >= rule.quantity) {
          const bulkQuantityMultiplier = Math.floor(item.quantity / rule.quantity);
          const remainingQuantity = item.quantity % rule.quantity;
          total = (bulkQuantityMultiplier * rule.priceFor * item.price) + (remainingQuantity * item.price);
        }
        break;
      default:
        break;
    }
    return total;
  }
}