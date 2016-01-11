import { Router } from 'express';
import { lines } from 'amtchrono';
import { railyard } from '../config/amt';

var router = new Router();

router.get('/lines', (req, res, next) => {

	lines.all(data => {
		res.json(data);
	});

});

router.get('/railyard', (req, res, next) => {

	res.json(railyard.trains);

});

module.exports = router;
