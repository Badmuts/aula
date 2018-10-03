module.exports = {
    origin: process.env.CORS_ORIGIN || "*",
    methods: process.env.CORS_METHODS || "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: process.env.CORS_PREFLIGHT_CONTINUE || false,
    optionsSuccessStatus: process.env.CORS_OPTIONS_SUCCESS_STATUS || 204
}
