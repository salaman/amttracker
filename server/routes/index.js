import { Router } from 'express';

var router = new Router();

router.get('/', function (req, res, next) {
	res.render('index', {title: 'AMT Tracker'});
});

module.exports = router;
