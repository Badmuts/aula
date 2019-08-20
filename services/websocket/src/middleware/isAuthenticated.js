const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_PUBLIC = new Buffer(process.env.ACCESS_TOKEN_PUBLIC || '', 'base64').toString('binary')
const cookie = require('cookie')

module.exports = function isAuthenticated() {
    return (socket, next) => {
        let token = null;

        if (socket.handshake.query && socket.handshake.query.token) {
            token = socket.handshake.query.token;
        } else if (socket.handshake.headers.cookie) {
            const { accessToken } = cookie.parse(socket.handshake.headers.cookie)
            token = accessToken;
        }

        if (token) {
            return jwt.verify(token, ACCESS_TOKEN_PUBLIC, function(err, decoded) {
                if(err) {
                    return next(new Error('Authentication error'));
                }
                socket.decoded = decoded;
                next();
            });
        }

        return next(new Error('Authentication error'));
    }
}
