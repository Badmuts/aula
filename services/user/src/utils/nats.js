const NATS = require('nats')
const natsConfig = require('../config/nats')
const nats = NATS.connect(natsConfig);

module.exports = nats
