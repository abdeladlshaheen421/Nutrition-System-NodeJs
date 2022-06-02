import mongoose from 'mongoose';
const { Schema } = mongoose;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  role: {
    type: String,
    required: true,
  },
  start_time: {
    type: Date,
  },
  end_time: {
    type: Date,
  },
});

module.exports = mongoose.model('doctors', doctorSchema);
