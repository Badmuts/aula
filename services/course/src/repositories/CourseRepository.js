const Course = require('./../models/Course.js')
const Emittery = require('emittery');
const emitter = new Emittery();
const apicache = require("apicache");

const repo = Object.assign(emitter, {
    find() {
        return Course.find().select('-__v').exec();
    },

    findOne(id) {
        return Course.findOne(id).select('-__v').exec()
    },

    create(course) {
        return Course.create(course)
            .then(course => {
                this.emit('created', course)
                return course
            })
    },

    update(id, course) {
        return Course.update({ _id: id }, course).exec()
            .then(() => Course.findOne({ _id: id }).exec())
            .then(_course => {
                this.emit('updated', _course)
                return _course
            })
    }
})

module.exports = repo
