import express from 'express';
import path from 'path';
import logger from 'morgan';
// import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default function (app) {
	// view engine setup
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(cookieParser());
	// app.use(express.static(path.join(__dirname, 'public')));

	// development webpack middleware
	if (process.env.NODE_ENV === 'development') {
		var webpack = require('webpack');
		var webpackConfig = require('../../webpack/webpack.dev.conf');
		var compiler = webpack(webpackConfig);

		app.use(require('webpack-dev-middleware')(compiler, {
			publicPath: webpackConfig.output.publicPath,
			noInfo: true,
			stats: {colors: true}
		}));

		app.use(require('webpack-hot-middleware')(compiler));
	}

	// production build
	app.use(express.static(path.join(__dirname, '../../static')));

	// app.use('/', require('../routes/index'));
	// app.use('/api', require('../routes/api'));
};
