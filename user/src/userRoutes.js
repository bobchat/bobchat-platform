const express = require('express');
const userStore = require("./userStore");
const Joi = require('joi');
const userRoutes = module.exports = exports = express.Router();

userRoutes.get('/token', async (req, res) => {
  const schema = Joi.object().keys({
    deviceUniqueId: Joi.string().required(),
  });

  const params = Joi.validate(req.query, schema);

  if (params.error) {
    return res.status(500).json({
      error: params.error
    });
  }

  const {
    deviceUniqueId
  } = params.value;

  try {
    const user = await userStore.loginOrCreateUser(deviceUniqueId);
    const token = user.generateToken();
    res.status(200).json({
      user,
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: e
    });
  }
});
