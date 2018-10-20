const NATS = require('nats')
const natsConfig = require('../config/nats')
const nats = NATS.connect(natsConfig);

module.exports = (elasticClient) => {
    console.log('Course indexer started...')

    nats.subscribe('*.*.course.created', function(course) {
        const {_id, ...body} = course
        elasticClient.create({
            index: 'courses',
            type: 'course',
            id: _id,
            body: body
        })
            .then(res => console.log('indexed course', res))
            .catch(err => console.error('ERROR: indexing course', err))
    })
}
