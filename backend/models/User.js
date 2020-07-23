'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create an schema
const userSchema = mongoose.Schema({
	name: { type: String, required: true, maxlength: 30 },
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true, select: true },
});

userSchema.statics.hashPassword = function (plainPassword) {
	return bcrypt.hash(plainPassword, 10);
};

// with the schema, create a model
const User = mongoose.model('User', userSchema);

// export the model
module.exports = User;
