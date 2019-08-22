const CourseRepository = require('./../../repositories/CourseRepository')
const apicache = require('apicache')

module.exports = {
    find(req, res, next) {
        CourseRepository.find()
            .then(courses => res.json(courses))
            .catch(next)
    },

    create(req, res, next) {
        const course = { name } = req.body

        CourseRepository.create(course)
            .then(_course => res.status(201).json(_course))
            .then(() => apicache.clear())
            .catch(next)
    },

    update(req, res, next) {
        const course = req.body

        CourseRepository.update(req.params.id, course)
            .then(_course => res.json(_course))
            .then(() => apicache.clear())
            .catch(next)
    }
}
