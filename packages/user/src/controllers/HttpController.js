const UserService = require('../services/UserService.js')

module.exports = {
    create(req, res, next) {
        UserService.create(req.body)
            .then(user => res.status(201).json(user))
            .catch(next)
    },

    findOne(req, res, next) {
        UserService.findOne(req.params.id)
            .then(user => res.json(user))
            .catch(next)
    },

    find(req, res, next) {
        res.status(204).send()
    },

    update(req, res, next) {
        res.status(204).send()
    },

    destroy(req, res, next) {
        res.status(204).send()
    }
}
