const crypto = require('@badmuts/aula-crypto')
const UserRepository = require('./../repositories/UserRepository')

module.exports = {
    login(email, password) {
        return UserRepository.findByEmail(email)
            .then(user => Promise.all([
                user,
                crypto.hash.compare(password, user.password)
            ]))
            // If login is successful return user otherwise null
            .then(([user, isPasswordCorrect]) => isPasswordCorrect === true
                ? user
                : null
            )
    }
}
