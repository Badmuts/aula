const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: require('./../../config/elastic').host
})

module.exports = {
    find(req, res, next) {
        client.search({
            q: req.query.q
        })
            .then(response => response.hits.hits)
            .then(hits => res.json(hits))
            .catch(next)
    }
}
