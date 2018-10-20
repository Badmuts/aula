const app = require('./app.js')
const server = require('http').Server(app)
const io = require('./io.js')(server)
const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.info(`Listening on :${PORT}`))
