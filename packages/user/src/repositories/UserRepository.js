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
    },

    findByEmail(email, withPassword = false) {
        const query = User.findOne({ email: email })

        if (withPassword) {
            query.select('+password')
        }

        return query.exec()
    }
}
