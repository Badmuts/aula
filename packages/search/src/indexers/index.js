const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
    host: require('./../config/elastic').host
})

module.exports = {
    start: () => {
        // start all indexers
        require('./CourseIndexer')(client)
    }
}
