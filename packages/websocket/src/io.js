const io = require('socket.io')
const amqp = require('@badmuts/serverless-amqp')

module.exports = function(server) {
    const wss = io(server)
    wss.on('connection', (ws) => {
        console.log('NEW CONNECTION')
        ws.on('error', console.log);
    })

    amqp.Queue('websocket-service.course.created', ['*.*.course.created.#'])
        .then(() => {
            amqp.consume('websocket-service.course.created', (message) => {
                const course = message.content
                console.log('course created', course)
                wss.emit('course.created', course)
            })
        })
    return wss;
}
