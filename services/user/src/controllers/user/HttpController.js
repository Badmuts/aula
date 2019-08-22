const UserService = require('../../services/UserService.js')
const apicache = require('apicache')

module.exports = {
    create(req, res, next) {
        UserService.create(req.body)
            .then(user => res.status(201).json(user))
            .then(() => apicache.clear())
            .catch(next)
    },

    findOne(req, res, next) {
        UserService.findOne(req.params.id)
            .then(user => res.json(user))
            .catch(next)
    },

    find(req, res, next) {
        UserService.find()
            .then(users => res.json(users))
            .catch(next)
    },

    update(req, res, next) {
        res.status(204).send()
    },

    destroy(req, res, next) {
        res.status(204).send()
    }
}
