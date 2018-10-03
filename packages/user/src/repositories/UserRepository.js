const User = require('./../models/User')

module.exports = {
    create(user) {
        return User.create(user)
    }
}
