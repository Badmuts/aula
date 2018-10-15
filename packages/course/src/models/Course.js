const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const courseSchema = new Schema({
  name: String,
  createdAt: Date,
  updatedAt: Date
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
