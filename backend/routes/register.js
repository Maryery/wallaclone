'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

//POST /register
// Create a new user in database

router.post('/', async (req, res, next) => {
	try {
		let userData = req.body;
		let { name, email, password } = userData;
		// We create the object in memory
		const user = new User({
			name,
			email,
			password: bcrypt.hashSync(password, 10),
		});
		// We save it in the database
		const userSave = await user.save();

		res.status(201).json({ result: userSave });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
