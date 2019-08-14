const UserRepository = require('./../repositories/UserRepository')

module.exports = {
    create(user) {
        // TODO: validate fields
        return UserRepository.create(user)
    },

    find() {
        return UserRepository.find()
    },

    findOne(id) {
        return UserRepository.findOne(id)
    }
}
