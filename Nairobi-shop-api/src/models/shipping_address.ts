import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user";

export const ShippingAddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  country: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  postalCode: String,
  name: String,
  instructions: String, // Add the 'instructions' field
});

export interface IShippingAddress extends Document {
  user: IUser["_id"];
  country: string;
  address: string;
  phone: string;
  postalCode?: string;
  name?: string;
  instructions?: string; // Add the 'instructions' field
}

const ShippingAddress = mongoose.model<IShippingAddress>(
  "ShippingAddress",
  ShippingAddressSchema
);

export default ShippingAddress;
