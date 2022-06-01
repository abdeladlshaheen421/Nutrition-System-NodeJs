import { Document, Model, model, Schema } from 'mongoose';
import User from '../interfaces/userInterface';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { JWT_SECRET } from "./../utilities/secrets";


export default interface UserModel extends User, Document {
  token?: string;

  generateJWT(): string;
  authJSON(): any;
  setPassword(password: string): void;
  validPassword(password: string): boolean;
  profileJSON(user: UserModel): any;
}


const UserSchema = new Schema({
  firstName : {
    type     : Schema.Types.String,
    lowercase: true,
    match    : [/^[a-zA-Z]+$/, 'is invalid'],
    index    : true
  },
  lastName : {
    type     : Schema.Types.String,
    lowercase: true,
    match    : [/^[a-zA-Z]+$/, 'is invalid'],
    index    : true
  },
  email    : {
    type     : Schema.Types.String,
    lowercase: true,
    unique   : true,
    match    : [/\S+@\S+\.\S+/, 'is invalid'],
    index    : true
  },
  image    : {
    type: Schema.Types.String
  },
  hash     : {
    type: Schema.Types.String
  },
  salt     : {
    type: Schema.Types.String
  },
}, {timestamps: true});

UserSchema.methods.validPassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function (): string {
  const todayDate = new Date();
  const exp   = new Date(todayDate);
  exp.setDate(todayDate.getDate() + 30);

  return jwt.sign({
    id      : this._id,
    email: this.email,
    exp     : exp.getTime() / 1000,
  }, JWT_SECRET);
};

UserSchema.methods.authJSON = function (): any {
  return {
    firstName : this.firstName,
    lastName : this.lastName,
    email   : this.email,
    token   : this.generateJWT(),
    image   : this.image
  };
};

UserSchema.methods.profileJSON = function (user: UserModel) {
  return {
    firstName : this.firstName,
    lastName : this.lastName,
    email   : this.email,
    image    : this.image || 'https://www.iconspng.com/images/young-user-icon.jpg',
  };
};

export const User: Model<UserModel> = model<UserModel>('User', UserSchema);
