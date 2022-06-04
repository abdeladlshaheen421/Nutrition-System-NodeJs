import { Document, Model, model, Schema } from 'mongoose';


enum Gender {
  'Male',
  'Female',
}

const clientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: Gender,
    },
    image:{
      type: String,
    }
    ,last_visit: {
      type: Date,
    },
    birth_date: {
      type: Date,
    },
  },
  { timestamps: true }
);



module.exports = model('client', clientSchema);

export default clientSchema;