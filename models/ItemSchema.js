const mongoose = require('mongoose');

const Itemschema = new mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      date: {
            type: Date,
            required: true,
            default: Date.now()
      }
});

const Item = module.exports = mongoose.model('items', Itemschema);