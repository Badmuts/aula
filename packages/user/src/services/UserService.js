const UserRepository = require('./../repositories/UserRepository')
const crypto = require('@badmuts/serverless-crypto')

module.exports = {
    create(user) {
        // TODO: validate fields
        return UserRepository.create(user)
    },

    find() {
        return UserRepository.find()
    },

    findOne(id) {
        return UserRepository.findOne(id)
    },

    /**
     * Check if user exists and provided password matches
     *
     * @param {String} email
     * @param {String} password
     * @returns {Promise<Object|null>}
     */
    login(email, password) {
        // find user by email
        return UserRepository.findByEmail(email, true)
            .then(user => Promise.all([
                user,
                crypto.hash.compare(password, user.password)
            ]))
            // If login is successful return user otherwise null
            .then(([user, isPasswordCorrect]) => isPasswordCorrect === true
                ? user
                : null
            )
    },
}
