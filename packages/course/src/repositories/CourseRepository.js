const Course = require('./../models/Course.js')

const observers = {
    'created': [],
    'updated': [],
    'destroyed': []
}

const notify = (event, data) => setImmediate(() => observers[event].map(cb => cb(data)))

module.exports = {
    find() {
        return Course.find().select('-__v').exec();
    },

    create(course) {
        return Course.create(course)
            .then(course => {
                notify('created', course)
                return course
            })
    },

    on(event, cb) {
        observers[event].push(cb)
    }
}
