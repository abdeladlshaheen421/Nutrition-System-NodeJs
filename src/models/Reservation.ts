import mongoose from 'mongoose';
const { Schema } = mongoose;

enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

const reservationSchema = new Schema({
  amount_paid: {
    type: Schema.Types.Number,
    required: true,
  },
  status: {
    type: Schema.Types.String,
    enum: [Status.PENDING, Status.APPROVED, Status.REJECTED],
    required: true,
  },
  date: {
    type: Schema.Types.Date,
    required: true,
  },
});

module.exports = mongoose.model('reservations', reservationSchema);
