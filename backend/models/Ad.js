'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create an schema
const adSchema = mongoose.Schema(
	{
		name: { type: String, required: true, max: 40, index: true },
		type: { type: String, enum: ['buy', 'sell'], required: true, index: true },
		description: { type: String, max: 150, required: true },
		price: { type: Number, required: true },
		image: { type: String, required: true },
		tags: {
			type: [String],
			enum: [
				'Motors',
				'Bikes',
				'Fashion',
				'Mobile',
				'Electronics',
				'RealEstate',
				'Home',
				'Books',
				'Services',
				'Jobs',
				'Others',
			],
		},
	},

	{
		/**
		 * Adds the created and updated properties
		 */
		timestamps: true,
	}
);

adSchema.statics.list = function (filtro, limit, skip, sort, fields) {
	var query = Ad.find(filtro);
	query.limit(limit);
	query.skip(skip);
	query.sort(sort);
	query.select(fields);
	return query.exec();
};

// with the schema, create a model
const Ad = mongoose.model('Ad', adSchema);

// export the model
module.exports = Ad;
