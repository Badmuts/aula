module.exports = {
    publicKey: new Buffer(process.env.ACCESS_TOKEN_PUBLIC || '', 'base64').toString('binary')
}
