const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
    leader: String,
    outline: String,
    endRequirements: String,
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now },
})

const videoSchema = new Schema({
    title: String,
    description: String,
    url: String,
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now },
})

const contentSchema = new Schema({
    type: String,
    name: String,
    path: String,
    url: String,
    size: Number,
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now },
})

const settingSchema = new Schema({
    key: String,
    value: String,
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now },
})

const announcementSchema = new Schema({
    title: String,
    message: String,
    announcer: String,
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now },
})

// create a schema
const courseSchema = new Schema({
  name: String,
  ects: Number,
  duration: String,
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now },

  module: moduleSchema,
  videos: [videoSchema],
  content: [contentSchema],
  settings: [settingSchema],
  announcements: [announcementSchema],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
