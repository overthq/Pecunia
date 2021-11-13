import { model, Schema, Document } from 'mongoose';

export interface SubscriptionType extends Document {
  hash: string;
  // Maybe store expiration information
}

const SubscriptionSchema = new Schema({
  hash: {
    type: String,
    required: true,
    unique: true
  }
});

export const Subscription = model<SubscriptionType>(
  'Subscription',
  SubscriptionSchema
);
