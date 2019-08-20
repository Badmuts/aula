const nats = require('../utils/nats')
const UserRepository = require('../repositories/UserRepository')
const { USER_CREATED } = require('@badmuts/aula-events')

const MessageService = {
    start: () => {
        console.log('Started MessageService')
        UserRepository.on(USER_CREATED, user => {
            nats.publish(USER_CREATED, user)
        })
    }
}

module.exports = MessageService
