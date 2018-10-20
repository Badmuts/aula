const UserRepository = require('../../repositories/UserRepository')
const NATS = require('nats')
const natsConfig = require('../../config/nats')
const nats = NATS.connect(natsConfig);

module.exports = {
    findByEmail({ email }, replyTo) {
        UserRepository.findByEmail(email, true)
            .then(user => nats.publish(replyTo, user))
    }
}
