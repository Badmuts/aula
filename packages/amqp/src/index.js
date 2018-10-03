const amqp = require('amqplib')
const config = {}
const self = this

/**
 * Configure amqp
 *
 * @param {*} exchange
 * @param {*} host
 * @param {*} port
 * @param {*} user
 * @param {*} password
 */
function configure(exchange, host, port, user, password) {
    self.exchange = exchange
    config.hostname = host
    config.port = port
    config.username = user
    config.password = password
}

/**
 * Connect with amqp
 */
function connect() {
    return Promise.resolve(self.connection)
        .then(conn => conn
            ? conn
            : amqp.connect(config)
        )
        .then(conn => {
            self.connection = conn
            return self.connection
        })
}

/**
 * Start a channel
 */
function createChannel() {
    return connect()
        .then(conn => self.channel
            ? self.channel
            : conn.createConfirmChannel()
        )
        .then(channel => {
            self.channel = channel
            return self.channel
        })
}

/**
 * Create a queue
 *
 * @param {string} name
 * @param {*} routingKeys
 * @param {*} options
 */
function Queue(name, routingKeys = [], options = {}) {
    return createChannel()
        .then(channel => Promise.all([
            channel,
            channel.assertQueue(name, options)
        ]))
        .then(results => results[0])
        .then(channel => Promise.all(
            routingKeys.map(key => channel.bindQueue(name, self.exchange, key))
        ))
}

/**
 * Consume a queue
 *
 * @param {*} queue
 * @param {*} cb
 * @param {*} options
 */
function consume(queue, cb, options = {}) {
    const onMessage = (channel, msg) => {
        const response = {
            content: msg.content
        }

        if (response.content && Buffer.isBuffer(response.content)) {
            try {
                response.content = JSON.parse(response.content.toString())
            } catch(e) {
                response.content = response.content.toString()
            }
        }

        cb(response)
        channel.ack(msg)
    }

    return createChannel()
        .then(channel => channel.consume(queue, msg => onMessage(channel, msg), options))
        .then(res => res.consumerTag)
}

function publish(route, body = '', headers = {}, options = {}) {
    return createChannel()
        .then(channel => {
            const msg = JSON.stringify(body)

            return Promise.all([
                channel,
                channel.publish(self.exchange, route, Buffer.from(msg), options)
            ])
        })
        .then(results => results[0])
        .then(channel => channel.waitForConfirms())
}

/**
 * Utility function to simply route commands or events to specific handlers.
 *
 */
function Router(serviceName) {
    return {
        command: (command, cb) => {
            const routingKeys = [
                `*.*.command.${command}`,
                `*.*.event.${command}.success`,
                `*.*.event.${command}.failed`
            ]

            const queues = routingKeys.map(key => `${serviceName}.${key}`)

            const successHandler = msg => {
                publish(routingKeys[1], msg)
            }

            const errorHandler = msg => {
                publish(routingKeys[2], msg)
            }

            const handleRoute = msg => cb(msg, successHandler, errorHandler)

            const createdQueues = queues.map((queue, key) => Queue(queue, [routingKeys[key]]))
            Promise.all(createdQueues)
                .then(() => consume(queues[0], handleRoute))
                .catch(err => console.error(err))
        },

        event: (event, cb) => {

        },
    }
}

module.exports = {
    configure,
    Queue,
    consume,
    publish,
    Router
}
