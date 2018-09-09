const Message = require('./models/message');
const Joi = require("joi");

module.exports = exports = function(server){
  let io = require('socket.io')(server);
  io.on('connection', function (socket) {
    socket.on('room', (room) => {
      socket.join(room);
    });

    socket.on('message', async data => {
      const schema = Joi.object().keys({
        content: Joi.string().min(1).max(280).required(),
        owner: Joi.string().alphanum().min(24).max(24).required(),
        room: Joi.string().alphanum().min(24).max(24).required(),
      });

      const params = Joi.validate(data, schema);

      if (params.error) {
        console.log('BAD MESSAGE');
        console.log(JSON.stringify(params));
      }

      const { content, owner, room } = params.value;

      const newMessage = new Message();
      newMessage.content = content;
      newMessage.owner = owner;
      newMessage.room = room;
      newMessage.created = new Date(Date.now());

      try {
        const message = await newMessage.save();
        io.to(room).emit('message', message);
      } catch (e) {
        console.log('BAD SAVE MESSAGE');
        console.error(JSON.stringify(e));
      }
    });
  });
}

