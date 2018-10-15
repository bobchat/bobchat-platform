const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
  TOKEN_SECRET,
} = require('./../../../env');

const userSchema = mongoose.Schema({
  deviceUniqueId: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    required: true
  },
  phone: {
    phoneNumber: {
      type: String,
      default: "",
      required: false
    },
    phoneNumberVerifiedAt: {
      type: Date,
      default: null,
      required: false
    }
  }
});

class User {
  generateToken() {
    return jwt.sign(
      {
        id: this._id
      },
      TOKEN_SECRET,
    );
  }
}

userSchema.loadClass(User);

module.exports = exports = mongoose.model("User", userSchema);
