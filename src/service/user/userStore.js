const User = require("./User");

class UserStore {
  constructor() {}
  async createUser(deviceUniqueId = "") {
    const user = new User();
    user.deviceUniqueId = deviceUniqueId;
    user.created = new Date(Date.now());
    try {
      return await user.save();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async loginOrCreateUser(deviceUniqueId = "") {
    let user;
    try {
      user = await User.findOne({ deviceUniqueId });
    } catch (e) {
      console.error(e);
      throw e;
    }
    
    if(!user) {
      try {
        user = await this.createUser(deviceUniqueId);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }

    return user;
  }
}

module.exports = new UserStore();
