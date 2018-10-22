import { Document, Model } from "mongoose";
import IUser from './interfaces/IUser';
export interface IUserModel extends IUser, Document {
}
export declare const UserSchema: any;
export declare const User: Model<IUserModel>;
