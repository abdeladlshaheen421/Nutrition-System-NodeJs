import mongoose from 'mongoose';
const { Schema } = mongoose;

const clinicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    unique: true,
    required: true,
  },
  waiting_time: {
    type: String,
    required: true,
  },
  opens_at: {
    type: Date,
    required: true,
  },
  closes_at: {
    type: Date,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('clinics', clinicSchema);
