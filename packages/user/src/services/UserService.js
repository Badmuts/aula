const UserRepository = require('./../repositories/UserRepository')

module.exports = {
    create(user) {
        // TODO: validate fields
        return UserRepository.create(user)
    },

    findOne(id) {
        return UserRepository.findOne(id)
    }
}
