const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  names: [{
    langCode: { type: String, required: true, default: 'cn' },
    name: { type: String, required: true }
  }],
  description: { type: String, required: true },
  solds: Number,
  comments: [{
    title: String,
    addresses: [{
      region: { type: String, required: true },
      country: { type: String, required: true }
    }]
  }]
}, {
  timestamps: true,
  collection: 'products'
});

module.exports = mongoose.model('Product', productSchema);
