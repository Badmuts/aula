module.exports = {
    uri: `nats://${process.env.NATS_HOST || 'nats'}:4222`,
    json: true,
    name: 'user-service',
}
