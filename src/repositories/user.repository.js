const User = require("../models/User");

class UserRepository {

    async getAll() {
        return await User.find({}, "-__v");
    }

    async getById(id) {
        return await User.findById(id);
    }

    async create(data) {
        return await User.create(data);
    }

    async createMany(users) {
        return await User.insertMany(users);
    }

    async update(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }

}

module.exports = new UserRepository();