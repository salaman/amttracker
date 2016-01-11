'use strict';

var fs = require('fs');
var path = require('path');
var request = require('request');
var async = require('async');
var _ = require('lodash');

module.exports = function (callback) {

	getFile('root', function (root) {
		processRoot(root, callback);
	});

	function getFile(file, callback) {
		var fileName = path.resolve(__dirname, '../../data/' + file + '.json');

		fs.readFile(fileName, function (err, data) {
			if (err) {
				downloadFromServer(file, callback);
			} else {
				callback(JSON.parse(data));
			}
		});
	}

	function downloadFromServer(file, callback) {
		var url = 'http://svcchrono.amt.qc.ca/' + file + '.json';

		request(url, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log('downloaded ', url);

				callback(JSON.parse(body));
			}
		});
	}

	function processRoot(root, callback) {
		var lines = _.map(root.lignes, function (data) {
			return {
				id: parseInt(data.route_id, 10),
				name: data.name,
				color: data.color,
				twitter: data.twitter,
				json: data.json
			};
		});

		async.each(lines, function (line, asyncCallback) {
			getFile(line.json.replace('.json', ''), function (data) {
				processLineData(data, line, asyncCallback);
			});
		}, function (err) {
			if (err) {
				throw err;
			}

			callback(lines);
		});
	}

	function processLineData(data, line, callback) {
		line.stops = _.map(data.stops, function (s) {
			return {
				sequence: parseInt(s.sequence, 10),
				name: s.name,
				coords: { lat: parseFloat(s.lat), lng: parseFloat(s.lon) }
			};
		});

		line.path = _.map(data.shape, function (p) {
			return { lat: parseFloat(p.lat), lng: parseFloat(p.lon) };
		});

		callback();
	}
};
