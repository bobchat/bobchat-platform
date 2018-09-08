const express = require('express');
const json = require('body-parser').json();
const Room = require('./../models/room');
const Joi = require('joi');

const roomRoutes = module.exports = exports = express.Router();


roomRoutes.get('/list', async (req, res) => {
  try {
    let rooms = await Room.find();
    res.status(200).json({
      rooms,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e
    });
  }
});

roomRoutes.post('/new', json, async (req, res) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(280).required(),
    owner: Joi.string().alphanum().min(24).max(24).required(),
  });

  const params = Joi.validate(req.body, schema);

  console.log(JSON.stringify(params.error));

  if (params.error) {
    return res.status(500).json({
      error: params.error
    });
  }

  const {
    title,
    owner
  } = params.value;


  const newRoom = new Room();
  newRoom.title = title;
  newRoom.created = new Date(Date.now());
  newRoom.owner = owner;

  try {
    const room = await newRoom.save();
    res.status(200).json({
      room,
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e
    });
  }
});