const express = require('express');
const json = require('body-parser').json();
const roomStore = require('./roomStore');
const Joi = require('joi');
const tokenMiddleware = require("./../../util/tokenMiddleware");

const roomRoutes = module.exports = exports = express.Router();

roomRoutes.get('/list', async (req, res) => {
  let {lat, lng, radius, units} = req.query;

  try {
    let rooms = await roomStore.listPublicRoomsWithinRadius(lat, lng, radius, units);
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


roomRoutes.get('/list/private', tokenMiddleware, async (req, res) => {
  let { _id } = req.user;
  try {
    let rooms = await roomStore.listPrivateRoomsForUser(_id);
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
  // const schema = Joi.object().keys({
  //   title: Joi.string().min(1).max(280).required(),
  //   owner: Joi.string().alphanum().min(24).max(24).required(),
  //   coordinates: Joi.array().required(),
  //   radius: Joi.number(),
  //   units: Joi.string().required(),
  // });

  // const params = Joi.validate(req.body, schema);

  // if (params.error) {
  //   return res.status(500).json({
  //     error: params.error
  //   });
  // }

  // const {
  //   title,
  //   owner,
  //   coordinates,
  //   radius,
  //   units,
  // } = params.value;

  try {
    const room = await roomStore.createRoom(req.body);
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

roomRoutes.post('/new/private', json, async () => {
  let { senderId, senderAlias, parentRoomId } = req.body;
  try {
    const room = await roomStore.createPrivateRoom(senderId, senderAlias, parentRoomId);
    res.status(200).json({
      room,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
});

roomRoutes.post("/up-vote", tokenMiddleware, json, async (req, res) => {
  let roomId = req.body.roomId;
  let { _id } = req.user;
  try {
    let room = await roomStore.upVoteRoom(roomId, _id.toString());
    res.status(200).json({ room });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
});


roomRoutes.post('/down-vote', tokenMiddleware, json, async (req, res) => {
  let roomId = req.body.roomId;
  let { _id } = req.user;
  try {
    let room = await roomStore.downVoteRoom(roomId, _id.toString());
    res.status(200).json({ room });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
});
