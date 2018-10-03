const UserRepository = require('./../repositories/UserRepository')

module.exports = {
    create(user) {
        // TODO: validate fields
        return UserRepository.create(user)
    }
}
