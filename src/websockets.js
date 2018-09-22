const Message = require('./service/message/Message');
const Joi = require("joi");

module.exports = function(server) {
  let io = require('socket.io')(server);
  io.on('connection', function (socket) {

    socket.on('room', params => {
      let room = params.room;
      console.log(`Join room ${room._id}`);
      socket.join(room._id);
    });

    socket.on('message', async data => {
      console.log(data);
      const schema = Joi.object().keys({
        content: Joi.string().min(1).max(280).required(),
        ownerId: Joi.string().alphanum().min(24).max(24).required(),
        roomId: Joi.string().alphanum().min(24).max(24).required(),
      });

      const params = Joi.validate(data, schema);

      if (params.error) {
        console.log('BAD MESSAGE');
        console.log(JSON.stringify(params));
      }

      const { content, ownerId, roomId } = params.value;

      const newMessage = new Message();
      newMessage.content = content;
      newMessage.owner = ownerId;
      newMessage.room = roomId;
      newMessage.created = new Date(Date.now());

      try {
        const message = await newMessage.save();
        io.to(roomId).emit('message', message);
      } catch (e) {
        console.log('BAD SAVE MESSAGE');
        console.error(e);
      }
    });
  });
}

