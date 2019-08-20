const io = require('socket.io')
const nats = require('./utils/nats');
const isAuthenticated = require('./middleware/isAuthenticated')
const { COURSE_CREATED, COURSE_UPDATED } = require('@badmuts/aula-events')

module.exports = function(server) {
    const wss = io(server)

    // every request should be authenticated via JWT
    wss.use(isAuthenticated())

    wss.on('connection', ws => {
        console.log('NEW CONNECTION')
        console.log('PAYLOAD', ws.decoded)
        ws.on('error', console.log);

        nats.subscribe(COURSE_CREATED, function(course) {
            ws.emit('course.created', course)
        })

        nats.subscribe(COURSE_UPDATED, function(course) {
            ws.emit('course.updated', course)
        })
    })

    return wss;
}
