import mongoose from 'mongoose';
const { Schema } = mongoose;

const assistantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('assistants', assistantSchema);
