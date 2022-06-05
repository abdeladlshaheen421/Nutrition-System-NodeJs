import mongoose from 'mongoose';
import { Gender } from './client.model';
const { Schema } = mongoose;

const doctorSchema = new Schema({
  name: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
  },
  phone: {
    type: Schema.Types.String,
  },
  startTime: {
    type: Schema.Types.Date,
  },
  endTime: {
    type: Schema.Types.Date,
  },
  gender: {
    type: Schema.Types.String,
    enum: Gender,
  },
  clinic: {
    type: Schema.Types.ObjectId,
    ref: 'Clinic',
  },
  image: {
    type: String,
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
