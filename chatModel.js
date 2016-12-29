var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  user : String,
  message : String
});

var Chat = mongoose.model('Chat',chatSchema);
module.exports = Chat;
