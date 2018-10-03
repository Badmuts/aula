const UserService = require('../services/UserService.js')

module.exports = {
    create(msg, success, error) {
        UserService.create(msg.content)
            .then(success)
            .catch(error)
    }
}
