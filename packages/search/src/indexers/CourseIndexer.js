const amqp = require('@badmuts/aula-amqp')

module.exports = (elasticClient) => {
    console.log('Course indexer started...')
    amqp.Queue('search-service.course-indexer.course.created', ['*.*.course.created.#'])
        .then(() => {
            amqp.consume('search-service.course-indexer.course.created', (message) => {
                const {_id, ...body} = message.content
                elasticClient.create({
                    index: 'courses',
                    type: 'course',
                    id: _id,
                    body: body
                })
                    .then(res => console.log('indexed course', res))
                    .catch(err => console.error('ERROR: indexing course', err))
            })
        })
}
