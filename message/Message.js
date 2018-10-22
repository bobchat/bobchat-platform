const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  geo: {
    location: Array,
    radius: Number,
    units: String,
  },
  location: {
    type: String,
    coordinates: Array
  },
  created: {
    type: Date,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  upvoteCount: {
    type: Number,
    required: true,
    default: 0
  },
  downvoteCount: {
    type: Number,
    required: true,
    default: 0
  },
  flagged: {
    type: Boolean,
    required: true,
    default: false
  }
});

class Message {}

messageSchema.loadClass(Message);

module.exports = exports = mongoose.model("Message", messageSchema);
