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

        TokenService.login(email, password)
            .then(user => user
                ? TokenService.createTokenPair(user)
                : Promise.reject({ status: 400, message: 'User not found or wrong password provided'})
            )
            .then(tokenPair => res.json(tokenPair))
            .catch(next)
    }
}
