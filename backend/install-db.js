'use strict';

const conn = require('./lib/connectMongoose');
const Ad = require('./models/Ad');
const User = require('./models/User');

conn.once('open', async () => {
	try {
		await initAds();
		await initUsers();
		conn.close();
	} catch (err) {
		console.error('Hubo un error:', err);
		process.exit(1);
	}
});

async function initAds() {
	await Ad.deleteMany();
	await Ad.insertMany([
		{
			name: 'Bicycle',
			type: 'sell',
			description: 'I sell a bicycle in perfect condition, for little use.',
			price: 150,
			image: 'bicycle.jpg',
			tags: ['Bikes'],
		},
		{
			name: 'Iphone 11 Pro Max',
			type: 'buy',
			description: 'Gold Color, 64 Gb, * NEW BOX *, Negotiable.',
			price: 1100,
			image: 'iphone.jpg',
			tags: ['Mobile'],
		},
		{
			name: 'Mazda CX-3 -2018',
			type: 'sell',
			description: 'Always kept in a private garage Equipment',
			price: 17899,
			image: 'mazda.jpg',
			tags: ['Motors'],
		},
		{
			name: 'Geronimo Stillton Books',
			type: 'sell',
			description: 'I sell books from Geronimo Stillton in perfect condition',
			price: 7,
			image: 'geronimo.jpg',
			tags: ['Books'],
		},
		{
			name: 'Plastic figure Mario and Yoshi',
			type: 'sell',
			description: 'Beautiful plastic figure',
			price: 6,
			image: 'mario-yoshi.jpg',
			tags: ['Others'],
		},
		{
			name: 'haircut at home',
			type: 'sell',
			description: 'from the comfort of your home',
			price: 15,
			image: 'haircut.jpg',
			tags: ['Services'],
		},
		{
			name: 'House in front of road',
			type: 'sell',
			description:
				'5 bedrooms, 3 bathrooms, kitchen, garage, storage room and pool',
			price: 600000,
			image: 'house-road.jpg',
			tags: ['RealEstate'],
		},
		{
			name: 'Clothes',
			type: 'buy',
			description: 'I buy classic clothes, woman or man, in perfect condition',
			price: 15,
			image: 'clothes.jpg',
			tags: ['Fashion'],
		},
		{
			name: 'Circuit board resistor',
			type: 'sell',
			description: 'prototype board for small projects',
			price: 9,
			image: 'circuit-board.jpg',
			tags: ['Electronics'],
		},
	]);
}

async function initUsers() {
	await User.deleteMany();
	await User.insertMany([
		{
			name: 'user1',
			email: 'user@example.com',
			password: await User.hashPassword('1234'),
		},
	]);
}
