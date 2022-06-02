import mongoose from 'mongoose';
const { Schema } = mongoose;

const clinicAdminSchema = new Schema({
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
  birth_date: {
    type: Date,
    required: true,
  },
  national_id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('clinic_admins', clinicAdminSchema);
