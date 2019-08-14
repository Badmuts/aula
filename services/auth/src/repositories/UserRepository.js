const NATS = require('nats')
const nats = NATS.connect(require('./../config/nats'));

module.exports = {
    findOne(id) {
        console.log('findOne', id)
        return new Promise(resolve => {
            nats.requestOne('user.findOne', { id }, response => {
                console.log('findone res', response)
                resolve(response)
            })
        })
    },

    findByEmail(email) {
        return new Promise(resolve =>
            nats.requestOne(
                'user.findByEmail', { email },
                response => resolve(response)
            )
        )
    }
}
