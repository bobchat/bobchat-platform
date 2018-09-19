const express = require('express');
const json = require('body-parser').json();
const Room = require('./../models/room');
const { createRoom } = require('./../models/creators/createRoom');
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
    coordinates: Joi.array().required(),
    radius: Joi.number(),
    units: Joi.string().required(),
  });

  const params = Joi.validate(req.body, schema);

  if (params.error) {
    return res.status(500).json({
      error: params.error
    });
  }

  const {
    title,
    owner,
    coordinates,
    radius,
    units,
  } = params.value;

  try {
    const room = await createRoom(title, owner, coordinates, radius, units);
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