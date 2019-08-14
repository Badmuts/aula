const CourseRepository = require('./../repositories/CourseRepository')
const NATS = require('nats')
const natsConfig = require('../config/nats')
const nats = NATS.connect(natsConfig);

module.exports = () => {
    CourseRepository.on('created', course => {
        nats.publish('*.*.course.created', course)
    })

    CourseRepository.on('updated', course => {
        nats.publish('*.*.course.updated', course)
    })
}
