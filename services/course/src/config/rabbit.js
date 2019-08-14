module.exports = {
    host: process.env.RABBIT_HOST || 'rabbit',
    username: process.env.RABBIT_USER || 'root',
    password: process.env.RABBIT_PASSWORD || 'root',
}
