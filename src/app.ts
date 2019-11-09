import dotenv from "dotenv";
import mongoose from 'mongoose';
import { Ad } from './models/ad';

const ads: Ad[] = [
  {name: 'Classic Ad', description: 'Offers the most basic level of advertisement', price: 269.99},
  {name: 'Stand out Ad', description: 'Allows advertisers to use a company logo and use a longer presentation text', price: 322.99},
  {name: 'Premium Ad', description: 'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility', price: 394.99},
];

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI_LOCAL;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
  console.log('Connection to DB successful');
}).catch((err) => {
  console.log('Connection to DB failed: ' + err);
});
