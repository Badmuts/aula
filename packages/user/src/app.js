const app = require('@badmuts/serverless-base-server')
const HttpController = require('./controllers/HttpController')

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

module.exports = app
