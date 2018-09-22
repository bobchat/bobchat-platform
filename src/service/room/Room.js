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
    default: ""
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

class Room {}

roomSchema.loadClass(Room);

module.exports = exports = mongoose.model("Room", roomSchema);
