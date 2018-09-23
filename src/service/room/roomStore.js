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
  async findById(roomId){
    try {
      return await Room.findById(roomId);
    } catch (e) {
      throw e;
    }
  }
  async listPublicRoomsWithinRadius(lat, lng, radius, units) {
    let geo = {
      type: 'Point',
      coordinates: [lng, lat],
    };

    try {
      let rooms = await Room.find({
        isPrivate: false,
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

  async createPrivateRoom(
    senderId = '',
    senderAlias = '',
    parentRoomId = '',
  ){
    const now = Date.now();
    const room = new Room();
    const parentRoom = this.findById(parentRoomId);

    room.title = parentRoom.title;
    room.ownerId = parentRoom.ownerId;
    room.alias = parentRoom.alias;
    room.created = new Date(now);
    room.expires = parentRoom.expires;
    room.location = parentRoom.locatio;
    room.geo = parentRoom.geo;
    // Private Room Fields
    room.isPrivate = true;
    room.senderId = senderId;
    room.senderAlias = senderAlias;
    room.parentRoomId = parentRoomId;
  
    try {
      return await room.save();
    } catch (e) {
      throw e;
    }  
  }
  // Voting
  async upVoteRoom(roomId, userId){
    let room = await this.findById(roomId);
    let isUpVoted = room.upVoteUserIds.includes(userId.toString());
    if(isUpVoted) return room;

    let isDownVoted = room.downVoteUserIds.includes(userId);
    let query = isDownVoted ? {
      $pull: { downVoteUserIds: userId }
    } : {
      $push: { upVoteUserIds: userId }
    };

   try {
    return await Room.findByIdAndUpdate(roomId, query)
   } catch(e) {
     throw e;
   }
  }

  async downVoteRoom(roomId, userId){
    let room = await this.findById(roomId);
    let isDownVoted = room.downVoteUserIds.includes(userId);
    if (isDownVoted) {
      return room;
    }

    let isUpVoted = room.upVoteUserIds.includes(userId);
    let query = isUpVoted ? {
      $pull: { upVoteUserIds: userId }
    } : {
        $push: { downVoteUserIds: userId }
      };

    try {
      return await Room.findByIdAndUpdate(roomId, query)
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new RoomStore();
