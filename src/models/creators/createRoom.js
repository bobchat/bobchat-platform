const Room = require("./../room");
const circleToPolygon = require("circle-to-polygon");

module.exports = {
  createRoom,
};

async function createRoom(
  title = "",
  owner = "",
  coordinates = [],
  radius = 0,
  units = "feet",
) {

  let room = new Room();
  room.title = title;
  room.owner = owner;
  room.created = new Date(Date.now());

  room.geo = {
    coordinates,
    radius,
    units
  };

  room.location = circleToPolygon(coordinates, radius, 32);


  try {
    return await room.save();
  } catch (e) {
    throw e;
  }
};
