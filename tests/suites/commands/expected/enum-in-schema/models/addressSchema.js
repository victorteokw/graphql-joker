const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  country: { type: String, enum: ['China', 'US'] }
});

module.exports = addressSchema;
