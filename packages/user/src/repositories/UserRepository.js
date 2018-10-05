const User = require('./../models/User')

module.exports = {
    create(user) {
        return User.create(user)
    },

    findOne(id) {
        return User.findById(id).exec()
    }
}
