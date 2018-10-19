const UserService = require('../../services/UserService')
const TokenService = require('../../services/TokenService')

module.exports = {
    /**
     * Create token pair containing an access- and refreshtoken
     *
     * An email and password should be provided
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    create(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return next({
                status: 400,
                message: 'No email or password provided'
            })
        }

        UserService.login(email, password)
            .then(user => user
                ? TokenService.createTokenPair(user)
                : Promise.reject({ status: 400, message: 'User not found or wrong password provided'})
            )
            .then(tokenPair => res.json(tokenPair))
            .catch(next)
    },

    /**
     * Update (refresh) provided tokenpair
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    update(req, res, next) {
        const { accessToken, refreshToken } = req.body

        if (!accessToken || !refreshToken) {
            return next({
                status: 400,
                message: 'Missing access- or refreshtoken'
            })
        }

        TokenService.refreshTokenPair({ accessToken, refreshToken })
            .then(tokenPair => res.json(tokenPair))
            .catch(next)
    }
}
