const mongoose = require('mongoose');
const { Schema } = mongoose;

const meetingSchema = new Schema({
  startedAt: { type: Date, required: true, default: new Date() }
}, {
  timestamps: true,
  collection: 'meetings'
});

module.exports = mongoose.model('Meeting', meetingSchema);
