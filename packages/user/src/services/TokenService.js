const jwt = require('jsonwebtoken')
const config = require('../config/jwt')
const util = require('util');
const jwtSign = util.promisify(jwt.sign)
const jwtVerify = util.promisify(jwt.verify)
const crypto = require('@badmuts/serverless-crypto')
const UserRepository = require('../repositories/UserRepository')

module.exports = {
    /**
     * Check if user exists and provided password matches
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

    /**
     * Create a tokenPair (accessToken and refreshToken) for given user.
     *
     * @param {Object} user
     * @returns {Promise<Object>} tokenPair
     */
    createTokenPair(user) {
        return Promise.all([
            createRefreshToken(user),
            createAccessToken(user)
        ])
            .then(([refreshToken, accessToken]) => ({ refreshToken, accessToken }))
    },

    /**
     * Checks if tokenPair needs refreshing and tries to refresh tokenPair.
     *
     * @param {Object} tokenPair
     * @returns {Promise<Object>} tokenPair
     */
    refreshTokenPair(tokenPair) {
        // Check if tokenPair has valid signatures
        return Promise.all([
            jwtVerify(tokenPair.accessToken, config.accessToken.publicKey, { ignoreExpiration: true }),
            jwtVerify(tokenPair.refreshToken, config.refreshToken.publicKey)
        ])
            .then(([accessToken, _]) => Promise.all([
                isTokenExpired(accessToken)
                    ? UserRepository.findOne(accessToken.sub).then(createAccessToken) // TODO: Handle removed users
                    : tokenPair.accessToken,
                tokenPair.refreshToken
            ]))
            .then(([accessToken, refreshToken]) => ({ accessToken, refreshToken }))
    }
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

function isTokenExpired(token) {
    return token.exp < (Date.now() / 1000)
}
