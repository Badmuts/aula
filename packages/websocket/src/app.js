const app = require('@badmuts/aula-base-server')
const amqp = require('@badmuts/aula-amqp')
const AmqpRouter = amqp.Router('course-service')

app.get('/healthz', (req, res, next) => {
    res.json({
        version: require('../package.json').version,
        healthy: true
    })
})

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handler
// // no stacktraces leaked to user unless in development environment
// app.use((err, req, res, next) => {
//     err.status = err.status || 500

//     if (process.env.NODE_ENV !== 'test')
//         console.error('ERROR:', err)

//     res.status(err.status);
//     res.json({
//         status: (err.status > 300 && err.status < 500) ? 'fail' : 'error',
//         message: err.message,
//         code: err.code || '',
//         stack: (process.env.NODE_ENV === 'development') ? err.stack : {},
//     });
// });

module.exports = app
