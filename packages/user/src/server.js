const app = require('./app.js')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

console.info('Connecting to database...')

mongoose.connect('mongodb://db/user');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info('Database connection succesful')
  app.listen(PORT, () => console.info(`Listening on :${PORT}`))
});


