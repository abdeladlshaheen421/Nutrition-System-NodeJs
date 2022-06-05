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
    type: {
      city: Schema.Types.String,
      street: Schema.Types.String,
      building: Schema.Types.Number,
    },
    required: true,
  },
  waitingTime: {
    type: Schema.Types.String,
    required: true,
  },
  opensAt: {
    type: Schema.Types.Number,
    required: true,
  },
  closesAt: {
    type: Schema.Types.Number,
    required: true,
  },
  phone: {
    type: Schema.Types.String,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
  },
  clinicAdmin: {
    type: Schema.Types.ObjectId,
    ref: 'ClinicAdmin',
    required: true,
  },
  image: {
    type: String,
  },
});

const Clinic = mongoose.model('Clinic', clinicSchema);
export default Clinic;
