// register the Babel require hook on dev
if (process.env.NODE_ENV === 'development') {
	require('babel-register');
}

// load .env file
var dotenv = require('dotenv');
dotenv.load();

module.exports = require('./app');
