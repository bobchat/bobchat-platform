import { Document, Schema, Model } from 'mongoose';
import IUser from './interfaces/IUser';
export interface IUserModel extends IUser, Document {
}
export declare const UserSchema: Schema;
export declare const User: Model<IUserModel>;
