const CourseRepository = require('./../repositories/CourseRepository')
const amqp = require('@badmuts/aula-amqp')

module.exports = () => {
    CourseRepository.on('created', course => {
        amqp.publish('*.*.course.created.#', course)
    })
}
