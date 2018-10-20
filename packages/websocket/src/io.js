const io = require('socket.io')
const NATS = require('nats')
const natsConfig = require('./config/nats')
const nats = NATS.connect(natsConfig);

module.exports = function(server) {
    const wss = io(server)
    wss.on('connection', ws => {
        console.log('NEW CONNECTION')
        ws.on('error', console.log);
    })

    nats.subscribe('*.*.course.created', function(course) {
        console.log('course created', course)
        wss.emit('course.created', course)
    })

    nats.subscribe('*.*.course.updated', function(course) {
        console.log('course updated', course)
        wss.emit('course.updated', course)
    })

    return wss;
}
