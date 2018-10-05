const User = require('./../models/User')

module.exports = {
    create(user) {
        return User.create(user)
    },

    find() {
        return User.find().exec()
    },

    findOne(id) {
        return User.findById(id).exec()
    }
}
