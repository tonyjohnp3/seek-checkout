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
  AdId1 => {
    type: 'discountAmount' | 'bulkPriceFor'
    amount: number
    priceFor: number
    quantity: number
  },
  .
  .
  .
)