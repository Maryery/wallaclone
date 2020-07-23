var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
var app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');

	// authorized headers for preflight requests
	// https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();

	app.options('*', (req, res) => {
		// allowed XHR methods
		res.header(
			'Access-Control-Allow-Methods',
			'GET, PATCH, PUT, POST, DELETE, OPTIONS'
		);
		res.send();
	});
});

// connect to the database
require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'Wallaclone-API';

// middleware upload image

const storage = multer.diskStorage({
	destination: './public/assets/img',
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

app.use(
	multer({
		storage: storage,
		dest: './public/assets/img',
		limits: { fileSize: 1000000 },
		fileFilter: (req, file, cb) => {
			const filetypes = /jpeg|jpg|png|gif/;
			const mimetype = filetypes.test(file.mimetype);
			const extname = filetypes.test(path.extname(file.originalname));
			if (mimetype && extname) {
				return cb(null, true);
			}
			cb('Error: the file must be a valid image');
		},
	}).single('image')
);

/**
 * API routes
 */
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/apiv1/ads', require('./routes/apiv1/ads'));

/**
 * Website routes
 */

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	if (err.array) {
		// validation error
		err.status = 422;
		const errInfo = err.array();
		err.message = isAPIRequest(req)
			? { message: 'Not valid', errors: err.mapped() }
			: 'There have been one or more validation errors check them';
	}

	res.status(err.status || 500);

	if (isAPIRequest(req)) {
		res.json({ error: err.message });
		return;
	}

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	//render the error page

	res.render('error');
});

function isAPIRequest(req) {
	return req.originalUrl.startsWith('/apiv1/');
}

module.exports = app;
