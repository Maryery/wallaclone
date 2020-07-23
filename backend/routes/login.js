'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

//POST /login
// find a user in database
router.post('/', async (req, res, next) => {
	try {
		// collect the input parameters
		const email = req.body.email;
		const password = req.body.password;
		// search the user in the database
		const usuario = await User.findOne({ email: email });

		if (!usuario || !(await bcrypt.compare(password, usuario.password, null))) {
			res.status(404).json({ error: 'Usuario no encontrado' });
		}
		res.json({ result: usuario });
	} catch (err) {
		res.status(500).json({ error: err });
	}
});

module.exports = router;
