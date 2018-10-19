const app = require('./app.js')
const amqp = require('@badmuts/aula-amqp')
const PORT = process.env.PORT || 3000

const rabbitConfig = require('./config/rabbit')

console.info('Connecting to rabbit...')
amqp.configure('amq.topic', rabbitConfig.host, 5672, rabbitConfig.username, rabbitConfig.password)

app.listen(PORT, () => console.info(`Listening on :${PORT}`))
