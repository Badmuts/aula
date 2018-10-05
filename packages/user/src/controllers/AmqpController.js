const UserService = require('../services/UserService.js')
const log = (...args) => console.info(`[${new Date().toISOString()}]`, 'amqp', 'event', ...args)

module.exports = {
    create(msg, success, error) {
        UserService.create(msg.content)
            .then(user => {
                log('user.create.success', `#${user.id}`)
                return user
            })
            .then(success)
            .catch(err => {
                log('user.create.failed', 'ERROR:', err.message)
                error(err)
            })
    }
}
