const amqp = require('@badmuts/aula-amqp')

module.exports = {
    findOne(id) {
        return amqp.rpc('user.findOne', { id })
            .then(payload => {
                if (payload.email) return payload;
                throw new Error(payload)
            })
    },

    findByEmail(email) {
        return amqp.rpc('user.findByEmail', { email })
            .then(payload => {
                if (payload.email) return payload;
                throw new Error(payload)
            })
    }
}
