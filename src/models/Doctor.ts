import mongoose from 'mongoose';
import { Gender } from './Client';
const { Schema } = mongoose;

const doctorSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  phone: {
    type: Schema.Types.Number,
    required: true,
  },
  start_time: {
    type: Schema.Types.Date,
    required: true,
  },
  end_time: {
    type: Schema.Types.Date,
    required: true,
  },
  gender: {
    type: Schema.Types.String,
    enum: Gender,
  },
});

module.exports = mongoose.model('doctor', doctorSchema);
