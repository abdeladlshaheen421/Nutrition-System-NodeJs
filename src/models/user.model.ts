import { Document, Model, model, Schema } from 'mongoose';
import User from '../interfaces/userInterface';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const secretKey = process.env.TOKEN_SECRET as jwt.Secret

export default interface UserModel extends User, Document {
  token?: string;

  generateJWT(): string;
  authJSON(): any;
  setPassword(password: string): void;
  validPassword(password: string): boolean;
  profileJSON(user: UserModel): any;
}

const UserSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      lowercase: true,
      match: [/^[a-zA-Z]+$/, 'is invalid'],
      index: true,
    },
    lastName: {
      type: Schema.Types.String,
      lowercase: true,
      match: [/^[a-zA-Z]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: Schema.Types.String,
      lowercase: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    image: {
      type: Schema.Types.String,
    },
    password: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.validPassword = function (password: string): boolean {
  return bcrypt.compareSync(password + BCRYPT_PASSWORD, this.password)
};

UserSchema.methods.setPassword = function (password: string):void {
  const hashedPassword = bcrypt.hashSync(
    password + BCRYPT_PASSWORD,
    parseInt(SALT_ROUNDS as string)
  );
  this.password = hashedPassword;
};

UserSchema.methods.generateJWT = function (): string {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    secretKey,
    { expiresIn: '24h' }
  );
};

UserSchema.methods.authJSON = function (): any {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    image: this.image,
    token: this.generateJWT(),
  };
};

UserSchema.methods.profileJSON = function () {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    image: this.image || 'https://www.iconspng.com/images/young-user-icon.jpg',
  };
};

UserSchema.methods.login = async function (email:string,password:string): Promise<User | null> {
  try{
      const user = await User.findOne({ email: email })
      if(user){
        if(user.validPassword(password)){
          return user
        }else{
          return null
        }
      }else{
        return null
      }
  }catch(err){
    throw new Error(`Could not find this user ${email} => ${err}`)

  }
}

export const User: Model<UserModel> = model<UserModel>('User', UserSchema);
