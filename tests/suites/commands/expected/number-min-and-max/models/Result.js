const mongoose = require('mongoose');
const { Schema } = mongoose;

const resultSchema = new Schema({
  score: { type: Number, min: 0.5, max: 100.0 },
  hexKey: { type: Number, min: 0x1234, max: 0xabcd }
}, {
  timestamps: true,
  collection: 'results'
});

module.exports = mongoose.model('Result', resultSchema);
