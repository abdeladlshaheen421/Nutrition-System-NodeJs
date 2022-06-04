import mongoose from 'mongoose';
const { Schema } = mongoose;

const clinicSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  location: {
    type: Schema.Types.String,
    required: true,
  },
  waiting_time: {
    type: Schema.Types.String,
    required: true,
  },
  opens_at: {
    type: Schema.Types.Date,
    required: true,
  },
  closes_at: {
    type: Schema.Types.Date,
    required: true,
  },
  phone: {
    type: Schema.Types.Number,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
  },
  clinic_admin: {
    type: Schema.Types.ObjectId,
    ref: 'clinic_admins',
    required: true,
  },
});

module.exports = mongoose.model('clinics', clinicSchema);
