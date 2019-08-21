const CourseRepository = require('../repositories/CourseRepository')

module.exports = {
    create(req, res, next) {
        const { id } = req.params

        CourseRepository.enroll(id, req.user.sub)
            .then(enrollment => res.status(201).json(enrollment))
            .catch(err => next(err))
    },

    destroy(req, res, next) {

    }
}
