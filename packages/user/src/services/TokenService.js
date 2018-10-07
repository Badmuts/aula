const jwt = require('jsonwebtoken')
const config = require('../config/jwt')
const util = require('util');
const jwtSign = util.promisify(jwt.sign)
const crypto = require('@badmuts/serverless-crypto')
const UserRepository = require('../repositories/UserRepository')

module.exports = {
    login(email, password) {
        // find user by email
        return UserRepository.findByEmail(email, true)
            .then(user => Promise.all([
                user,
                crypto.hash.compare(password, user.password)
            ]))
            // If login is successful return user otherwise null
            .then(results => results[1] === true
                ? results[0]
                : null
            )
    },

    createTokenPair(user) {
        return Promise.all([
            createRefreshToken(user),
            createAccessToken(user)
        ])
            .then(tokens => ({
                refreshToken: tokens[0],
                accessToken: tokens[1]
            }))
    },
}

function createRefreshToken(user) {
    return jwtSign({
        sub: user._id,
    }, config.refreshToken.privateKey, {
        algorithm: config.refreshToken.algorithm,
        expiresIn: config.refreshToken.expiresIn,
        issuer: config.issuer
    })
}

function createAccessToken(user) {
    return jwtSign({
        sub: user._id,
    }, config.accessToken.privateKey, {
        algorithm: config.accessToken.algorithm,
        expiresIn: config.accessToken.expiresIn,
        issuer: config.issuer
    })
}
