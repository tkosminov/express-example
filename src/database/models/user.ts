import mongoose, { Model } from 'mongoose';
import plugin from 'mongoose-unique-array';

import { IUser } from './interfaces/user';

mongoose.set('runValidators', true);

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

UserSchema.plugin(plugin);

const User: Model<IUser> = mongoose.model('User', UserSchema);

export default User;
