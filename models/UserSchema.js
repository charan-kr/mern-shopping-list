const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true
      },
      password: {
            type: String,
            required: true
      },
      registeredDate: {
            type: Date,
            required: true,
            default: Date.now()
      }
});

const User = module.exports = mongoose.model('user', UserSchema);