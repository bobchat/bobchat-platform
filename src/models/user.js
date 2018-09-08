const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  phoneNumberVerifiedAt: {
    type: Date,
    default: null,
    required: false
  }
});

class User {
  hashPassword() {
    this.password = bcrypt.hashSync(password, 8);
  }
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
  generateToken() {
    return jwt.sign(
      {
        id: this._id
      },
      process.env.TOKEN_SECRET || "CHANGE_ME"
    );
  }
}

userSchema.loadClass(User);

module.exports = exports = mongoose.model("User", userSchema);
