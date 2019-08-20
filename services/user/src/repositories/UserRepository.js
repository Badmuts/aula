const User = require('./../models/User')
const Emittery = require('emittery');
const emitter = new Emittery();
const { USER_CREATED } = require('@badmuts/aula-events')

const UserRepository = Object.assign(emitter, {
    create(user) {
        return User.create(user)
            .then(user => {
                this.emit(USER_CREATED, user)
            })
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
})

module.exports = UserRepository
