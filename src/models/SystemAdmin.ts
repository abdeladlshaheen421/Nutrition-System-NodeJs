import mongoose from 'mongoose';
const { Schema } = mongoose;

const systemAdminSchema = new Schema({
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
  password: {
    type: Schema.Types.String,
    required: true,
  },
});

module.exports = mongoose.model('system_admins', systemAdminSchema);
