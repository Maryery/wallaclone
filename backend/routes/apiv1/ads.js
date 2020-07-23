'use strict';

const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');

// GET /apiv1/ads
//Find the list of all ads
router.get('/', async (req, res, next) => {
	try {
		const name = new RegExp(req.query.name, 'i');
		const type = req.query.type;
		const image = req.query.image;
		const price = req.query.price;
		const tags = new RegExp(req.query.tags, 'i');
		const limit = parseInt(req.query.limit || 10000);
		const skip = parseInt(req.query.skip);
		let sort = parseInt(req.query.sort);
		const fields = req.query.fields;
		const filtro = {};

		if (typeof name !== 'undefined') {
			filtro.name = name;
		}

		if (typeof type !== 'undefined') {
			filtro.type = type;
		}

		if (typeof tags !== 'undefined') {
			filtro.tags = tags;
		}

		if (typeof image !== 'undefined') {
			filtro.image = image;
		}

		if (sort === 0) {
			sort = { createdAt: -1 };
		} else if (sort === -1) {
			sort = { price: -1 };
		} else if (sort === 1) {
			sort = { price: 1 };
		}

		const docs = await Ad.list(filtro, limit, skip, sort, fields);
		res.json(docs);
	} catch (err) {
		next(err);
	}
});

// GET /apiv1/ads/:id
//Search for an ad by Id and return it
router.get('/:id', async (req, res, next) => {
	try {
		const _id = req.params.id;

		const ad = await Ad.findOne({ _id: _id });
		if (!ad) {
			const err = new Error('not found');
			err.status = 404;
			next(err);
			return;
		}
		res.json({ result: ad });
	} catch (err) {
		next(err);
	}
});

//POST /apiv1/ads
// Create a new Ad
router.post('/', async (req, res, next) => {
	try {
		req.body.image = req.file.originalname;
		const adData = req.body;
		// We create the object in memory
		const ad = new Ad(adData);
		// We save it in the database
		const adSave = await ad.save();

		res.status(201).json({ result: adSave });
		Requester(req.file.originalname);
	} catch (err) {
		next(err);
	}
});

/**
 * PUT /apiv1/ads
 * Update an ad
 */
router.put('/:id', async (req, res, next) => {
	try {
		const _id = req.params.id;
		const adData = req.body;

		const adUpdate = await Ad.findOneAndUpdate({ _id: _id }, adData, {
			new: true,
			useFindAndModify: false,
		});
		res.json({ result: adUpdate });
	} catch (err) {
		next(err);
	}
});

/**
 * DELETE /apiv1/ads
 * Delete an ad
 */
router.delete('/:id', async (req, res, next) => {
	try {
		const _id = req.params.id;

		await Ad.deleteOne({ _id: _id });

		res.json();
	} catch (err) {
		next(err);
	}
});

module.exports = router;
