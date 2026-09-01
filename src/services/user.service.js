const userRepository = require("../repositories/user.repository");

const { DOCUMENT_TYPES } = require("../constants");

const {
    UserNotFoundError,
    InvalidUserDataError,
    InvalidDocumentTypeError
} = require("../errors/domain.errors");

class UserService {

    async getAllUsers(page, limit) {
        return await userRepository.getAll(page, limit);
    }

    async getUserById(id) {
        const user = await userRepository.getById(id);

        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }

    async createUser(data) {

        if (!data.name || !data.email) {
            throw new InvalidUserDataError();
        }

        return await userRepository.create(data);
    }

    async addDocument(id, documentData) {

        const user = await userRepository.getById(id);

        if (!user) {
            throw new UserNotFoundError();
        }

        if (!documentData.documentType) {
            throw new InvalidDocumentTypeError();
        }

        const validDocumentTypes = Object.values(DOCUMENT_TYPES);

        if (!validDocumentTypes.includes(documentData.documentType)) {
            throw new InvalidDocumentTypeError();
        }

        return await userRepository.addDocument(id, documentData);
    }

    async updateUser(id, data) {

        const user = await userRepository.update(id, data);

        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }

    async deleteUser(id) {

        const user = await userRepository.delete(id);

        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }

}

module.exports = new UserService();