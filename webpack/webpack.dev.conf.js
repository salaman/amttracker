var webpack = require('webpack');
var config = require('./webpack.base.conf');

config.debug = true;

config.devtool = '#source-map';

config.entry.push('webpack-hot-middleware/client');

config.output.publicPath = 'http://localhost:3000/static/';

config.plugins = (config.plugins || []).concat([
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"development"'
		}
	})
]);

module.exports = config;
