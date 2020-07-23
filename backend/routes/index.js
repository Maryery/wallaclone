var express = require('express');
const router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index');
});

module.exports = router;
