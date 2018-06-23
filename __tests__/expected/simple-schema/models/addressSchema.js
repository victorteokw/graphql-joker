const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  region: String,
  line1: String,
  line2: String,
  country: String
});

module.exports = addressSchema;
