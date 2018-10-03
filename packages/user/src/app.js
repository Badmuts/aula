const app = require('@badmuts/serverless-base-server')
const amqp = require('@badmuts/serverless-amqp')
const AmqpRouter = amqp.Router('user')

const HttpController = require('./controllers/HttpController')
const AmqpController = require('./controllers/AmqpController')

app.get('/healthz', (req, res, next) => {
    res.json({
        version: require('../package.json').version,
        healthy: true
    })
})

app.post('/', HttpController.create)
app.get('/:id', HttpController.findOne)
app.get('/', HttpController.find)
app.put('/:id', HttpController.update)
app.delete('/:id', HttpController.destroy)

AmqpRouter.command('user.create', AmqpController.create)

module.exports = app
