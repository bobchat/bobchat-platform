const express = require('express');
const json = require('body-parser').json();;
const User = require('./../models/user');
const Joi = require('joi');

const userRoutes = module.exports = exports = express.Router();

userRoutes.post('/register', json, async (req, res) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(16).required(),
    phoneNumber: Joi.string().alphanum().min(10).max(10).required(),
  });

  const params = Joi.validate(req.body, schema);

  if(params.error) {
    return res.status(500).json({
      error: params.error
    });
  }

  const { username, phoneNumber } = params.value;

  let newUser = new User();
  newUser.username = username;
  newUser.phoneNumber = phoneNumber;
  newUser.created = new Date(Date.now());

  try {
    const savedUser = await newUser.save();
    res.status(200).json({ user: savedUser });
  } catch(e) {
    console.log('hit');
    res.status(500).json({
      error: e
    });
  }
});
