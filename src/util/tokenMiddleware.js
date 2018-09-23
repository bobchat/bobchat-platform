const jwt = require("jsonwebtoken");
const userStore = require('./../service/user/userStore');

module.exports = async function tokenMiddleware(req, res, next) {
  let decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.TOKEN_SECRET ||
      'CHANGE_ME');
  } catch (e) {
    return res.status(400).json({
      msg: 'Error Authenticating user'
    });
  }

  let user = await userStore.findById(decoded.id);
  
  if(!user) {
    return res.status(400).json({
      msg: `Could not find user ${decoded.id}`,
    });
  }

  req.user = user;
  next();
}
