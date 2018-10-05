const app = require('@badmuts/serverless-base-server')
const amqp = require('@badmuts/serverless-amqp')
const AmqpRouter = amqp.Router('user-service')

const HttpController = require('./controllers/HttpController')
const AmqpController = require('./controllers/AmqpController')

app.get('/healthz', (req, res, next) => {
    res.json({
        version: require('../package.json').version,
        healthy: true
    })
})

app.post('/', HttpController.create)
app.get('/', HttpController.find)
app.get('/:id', HttpController.findOne)
app.put('/:id', HttpController.update)
app.delete('/:id', HttpController.destroy)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
    err.status = err.status || 500

    if (process.env.NODE_ENV !== 'test')
        console.error('ERROR:', err)

    res.status(err.status);
    res.json({
        status: (err.status > 300 && err.status < 500) ? 'fail' : 'error',
        message: err.message,
        code: err.code || '',
        stack: (process.env.NODE_ENV === 'development') ? err.stack : {},
    });
});

AmqpRouter.command('user.create', AmqpController.create)

module.exports = app
