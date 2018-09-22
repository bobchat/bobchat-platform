const Room = require("./Room");
const circleToPolygon = require("circle-to-polygon");

class RoomStore {
  constructor() {}
  async createRoom({
    title = "",
    coords = {},
    radius = 200,
    units = "feet",
    alias = "",
    ownerId = null,
    expiresIn = 0
  }) {
    const now = Date.now();
    const room = new Room();
  
    room.title = title;
    room.ownerId = ownerId;
    room.alias = alias;
    room.created = new Date(now);
    room.expires = new Date(now + expiresIn);

    room.location = {
      coords: coords.coords,
      timestamp: new Date(coords.timestamp),
      radius,
      units
    };

    room.geo = circleToPolygon([coords.coords.longitude, coords.coords.latitude], radius, 32);

    try {
      return await room.save();
    } catch (e) {
      throw e;
    }
  }

  async listRooms(lat, lng, radius, units) {
    let geo = {
      type: 'Point',
      coordinates: [lng, lat],
    };

    try {
      let rooms = await Room.find({
        geo: {
          $geoIntersects: {
            $geometry: geo,
          },
        }
      });
      return rooms.reverse();
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new RoomStore();
