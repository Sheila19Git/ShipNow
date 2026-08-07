const User = require("../models/user.model");

class UserRepository {

    async createMany(users) {
        return await User.insertMany(users);
    }

}

module.exports = new UserRepository();