const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // Human Readble values for availability cirlce
  location: {
    coords: {
      accuracy: Number,
      altitude: Number,
      altitudeAccuracy: Number,
      heading: Number,
      latitude: Number,
      longitude: Number,
      speed: Number
    },
    timestamp: Date,
    radius: Number,
    units: String
  },
  // GeoJSON values for availability cirlce
  geo: {
    type: {
      type: String // Polygon
    },
    coordinates: {
      type: Array // [lng, lat]
    }
  },
  alias: {
    type: String,
    required: false,
    default: null
  },
  ownerId: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  },
  expires: {
    type: Date,
    required: true
  },
  upVoteUserIds: {
    type: Array,
    required: true,
    default: []
  },
  downVoteUserIds: {
    type: Array,
    required: true,
    default: []
  },
  flagged: {
    type: Boolean,
    required: true,
    default: false
  },
  // Private Room Fields
  isPrivate: {
    type: Boolean,
    required: true,
    default: false
  },
  senderId: {
    type: String,
    required: false,
    default: null
  },
  senderAlias: {
    type: String,
    required: false,
    default: null
  },
  parentRoomId: {
    type: String,
    required: false,
    default: null
  }
});

class Room {}

roomSchema.loadClass(Room);

module.exports = exports = mongoose.model("Room", roomSchema);
