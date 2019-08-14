const app = require('@badmuts/aula-base-server')

app.get('/healthz', (req, res, next) => {
    res.json({
        version: require('../package.json').version,
        healthy: true
    })
})

module.exports = app
