const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('@badmuts/serverless-crypto')

// create a schema
const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
});

userSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    crypto.hash.hash(user.password)
        .then(hash => {
            // override password with created hash
            user.password = hash
            return next()
        })
        .catch(next)
})

const User = mongoose.model('User', userSchema);

module.exports = User;
