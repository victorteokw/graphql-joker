const mongoose = require('mongoose');
const { Schema } = mongoose;
const addressSchema = require('./addressSchema');

const personSchema = new Schema({
  address: addressSchema,
  name: String
});

module.exports = personSchema;
