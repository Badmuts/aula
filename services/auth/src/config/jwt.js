module.exports = {
    accessToken: {
        algorithm: 'ES256',
        expiresIn: '2 hours',
        privateKey: new Buffer(process.env.ACCESS_TOKEN_PRIVATE || '', 'base64').toString('binary'),
        publicKey: new Buffer(process.env.ACCESS_TOKEN_PUBLIC || '', 'base64').toString('binary'),
    },

    refreshToken: {
        algorithm: 'ES256',
        expiresIn: '30 days',
        privateKey: new Buffer(process.env.REFRESH_TOKEN_PRIVATE || '', 'base64').toString('binary'),
        publicKey: new Buffer(process.env.REFRESH_TOKEN_PUBLIC || '', 'base64').toString('binary'),
    },

    issuer: 'user-service',
}
