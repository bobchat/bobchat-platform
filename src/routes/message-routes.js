const express = require("express");
const Message = require("./../models/message");
const Joi = require("joi");

const roomRoutes = (module.exports = exports = express.Router());

roomRoutes.get("/list/:room", async (req, res) => {
  console.log(`List messages for room ${req.params.room}`);
  const schema = Joi.object().keys({
    room: Joi.string().alphanum().min(24).max(24).required(),
  });

  const params = Joi.validate(req.params, schema);

  if (params.error) {
    return res.status(500).json({
      error: params.error
    });
  }

  const  {room } = params.value;

  try {
    let messages = await Message.find({ room });
    res.status(200).json({
      messages
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e
    });
  }
});
