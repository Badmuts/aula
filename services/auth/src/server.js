const app = require('./app.js')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info(`Listening on :${PORT}`))
