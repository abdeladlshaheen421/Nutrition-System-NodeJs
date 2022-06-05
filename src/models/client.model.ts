import mongoose from 'mongoose';
const { Schema } = mongoose;

export enum Gender {
  'Male',
  'Female',
}

const clientSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      select: false,
    },
    phone: {
      type: Schema.Types.String,
      required: true,
    },
    gender: {
      type: Schema.Types.String,
      enum: Gender,
    },
    lastVisit: {
      type: Schema.Types.Date,
    },
    birthDate: {
      type: Schema.Types.Date,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model('Client', clientSchema);
export default Client;
