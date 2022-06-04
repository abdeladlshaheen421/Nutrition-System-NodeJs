import { model, Schema } from 'mongoose';

export enum Gender {
  'Male',
  'Female',
}

const clientSchema = new Schema(
  {
    first_name: {
      type: Schema.Types.String,
      required: true,
    },
    last_name: {
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
    },
    phone: {
      type: Schema.Types.Number,
      required: true,
    },
    gender: {
      type: Schema.Types.String,
      enum: Gender,
    },
    last_visit: {
      type: Schema.Types.Date,
    },
    birth_date: {
      type: Schema.Types.Date,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model('client', clientSchema);

export default clientSchema;
