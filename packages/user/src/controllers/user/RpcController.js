const UserRepository = require('../../repositories/UserRepository')

module.exports = {
    findByEmail(msg, cb) {
        const payload = JSON.parse(msg.content.toString())

        UserRepository.findByEmail(payload.email, true)
            .then(cb)
            .catch(cb)
    },

    findOne(msg, cb) {
        const payload = JSON.parse(msg.content.toString())

        UserRepository.findOne(payload.id)
            .then(cb)
            .catch(cb)
    }
}
