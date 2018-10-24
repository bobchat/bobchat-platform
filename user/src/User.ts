import { Document, Schema, Model, model, connect } from 'mongoose';
import IUser from './interfaces/IUser';
import {
  MONGO_DB_HOST,
  MONGO_DB_PORT,
} from './env';

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

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

connect(`mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}`, {
  useNewUrlParser: true,
})
.then(() => {
  console.log('Connected to MongoDB...');
})
.catch(e => {
  console.error('There was an error connecting to MongoDB:');
  console.error(e);
});


