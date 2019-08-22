const app = require('@badmuts/aula-base-server')
const isAuthenticated = require('express-jwt')({
    secret: require('./config/jwt').accessToken.publicKey
})
const nats = require('./utils/nats')
const MessageService = require('./services/MessageService')

const apicache = require("apicache");
const redis = require("redis");

const cache = apicache.options({
    redisClient: redis.createClient({
        host: process.env.REDIS_HOST || 'localhost'
    }),
    statusCodes: {
        include: [200] // list status codes to require (e.g. [200] caches ONLY responses with a success/200 code)
    }
}).middleware;

const UserHttpController = require('./controllers/user/HttpController')
const UserMessageController = require('./controllers/user/MessageController')

app.get('/healthz', (req, res, next) => {
    res.json({
        version: require('../package.json').version,
        healthy: true
    })
})

app.post('/users', UserHttpController.create)
app.get('/users', [isAuthenticated, cache('60 minutes')], UserHttpController.find)
app.get('/users/:id', [isAuthenticated, cache('60 minutes')], UserHttpController.findOne)
app.put('/users/:id', [isAuthenticated], UserHttpController.update)
app.delete('/users/:id', [isAuthenticated], UserHttpController.destroy)

nats.subscribe('user.findByEmail', UserMessageController.findByEmail);
nats.subscribe('user.findOne', UserMessageController.findOne);

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

MessageService.start()

module.exports = app
