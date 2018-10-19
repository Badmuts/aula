const app = require('./app.js')
const mongoose = require('mongoose')
const amqp = require('@badmuts/aula-amqp')
const PORT = process.env.PORT || 3000

const dbConfig = require('./config/db')
const rabbitConfig = require('./config/rabbit')

console.info('Connecting to rabbit...')
amqp.configure('amq.topic', rabbitConfig.host, 5672, rabbitConfig.username, rabbitConfig.password)

console.info('Connecting to database...')
mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.database}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info('Database connection succesful')

  app.listen(PORT, () => console.info(`Listening on :${PORT}`))
});
