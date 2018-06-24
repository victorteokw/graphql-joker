const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  country: String,
  region: String,
  line: {
    one: { type: String, required: true },
    two: String
  },
  city: { type: String, required: true },
  postalCode: String
});

module.exports = addressSchema;
