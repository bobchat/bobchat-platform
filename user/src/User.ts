import { Document, Schema, Model, model } from "mongoose";
import IUser from './interfaces/IUser';

export interface IUserModel extends IUser, Document {}

export const UserSchema  = new Schema({
  deviceUniqueId: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  phoneNumberVerifiedAt: {
    type: Date,
    required: false
  }
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
