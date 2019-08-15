const course = require('./course')
const user = require('./user')

module.exports = {
    ...course,
    ...user
}
