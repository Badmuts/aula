const UserRepository = require('../../repositories/UserRepository')
const nats = require('../../utils/nats')

module.exports = {
    findOne({ id }, replyTo) {
        UserRepository.findOne(id)
            .then(user => nats.publish(replyTo, user))
    },

    findByEmail({ email }, replyTo) {
        UserRepository.findByEmail(email, true)
            .then(user => nats.publish(replyTo, user))
    }
}
