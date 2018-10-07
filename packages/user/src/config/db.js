module.exports = {
    host: process.env.DB_HOST || 'db',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'user',
}
