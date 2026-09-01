const User = require("../models/User");

class UserRepository {

    async getAll(page = 1, limit = 10) {
        const safePage = Math.max(Number(page) || 1, 1);
        const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);

        const skip = (safePage - 1) * safeLimit;

        return await User.find({}, "-__v")
            .skip(skip)
            .limit(safeLimit);
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
        return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
    }

    async addDocument(id, documentData) {
        try {
            return await User.findByIdAndUpdate(
                id,
                {
                    $push: {
                        documents: documentData
                    }
                },
                { returnDocument: "after" }
            );
        } catch (error) {
            error.code = "FILE_SAVE_ERROR";
            throw error;
        }
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }

}

module.exports = new UserRepository();