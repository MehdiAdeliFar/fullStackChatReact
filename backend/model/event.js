const mongoose = require('mongoose');
const event_schema = mongoose.Schema({
  date: Date,
  username: String,
  logType: String,
  description: String
});
module.exports = mongoose.model('event', event_schema);
