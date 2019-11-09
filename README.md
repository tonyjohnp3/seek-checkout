# Backend for Checkout service

This service uses a local mongoDB server for storing ads and customer detials

# Prerequisites
- NodeJS
- MongoDB

# How to test
Run yarn/npm test

# Pricing rules
Map of Ad Ids to rule in below format

Map(
  AdName => {
    type: 'discountAmount' | 'bulkPriceFor'
    amount: number
    priceFor: number
    quantity: number
  },
  .
  .
  .
)

Eg: 
- Premium Ad => {
    type: RuleType.DiscountAmount,
    amount: 5
  },
  Standout Ad => {
    type: RuleType.BulkFor,
    priceFor: 4,
    quantity: 5 
  }
- Standout Ad => {
    type: RuleType.DiscountAmount,
    amount: 23
  }
- Classic Ad => {
    type: RuleType.BulkFor,
    priceFor: 2,
    quantity: 3 
  }
