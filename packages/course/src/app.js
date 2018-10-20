const app = require('@badmuts/aula-base-server')
const isAuthenticated = require('express-jwt')({
    secret: require('./config/jwt').publicKey
})

const HttpController = require('./controllers/course/HttpController')

app.get('/healthz', (req, res, next) => {
    res.json({
        version: require('../package.json').version,
        healthy: true
    })
})

app.get('/courses', [isAuthenticated], HttpController.find)
app.post('/courses', [isAuthenticated], HttpController.create)
app.put('/courses/:id', [isAuthenticated], HttpController.update)

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

const Mqnotifier = require('./services/NotifyMq')
Mqnotifier()

module.exports = app
