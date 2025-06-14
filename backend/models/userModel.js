const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  // role: string,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
}, {
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
