const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

app.use(helmet())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors(require('./cors.js')))

module.exports = app
