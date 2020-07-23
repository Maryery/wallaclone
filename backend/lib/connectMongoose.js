'use strict';

const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('open', () => {
	console.log('Conect with MongoDB in', conn.name);
});

conn.on('error', (err) => {
	console.error('Connection error', err);
	process.exit(1);
});

mongoose.connect('mongodb://localhost/wallaclonedb', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

module.exports = conn;
