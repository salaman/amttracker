var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var clientConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// client (vue)

clientConfig.vue.loaders = {
	js: 'babel!eslint',
	// http://vuejs.github.io/vue-loader/configurations/extract-css.html
	css: ExtractTextPlugin.extract('css'),
	less: ExtractTextPlugin.extract('css!less'),
	sass: ExtractTextPlugin.extract('css!sass'),
	stylus: ExtractTextPlugin.extract('css!stylus')
};

// http://vuejs.github.io/vue-loader/workflow/production.html
clientConfig.plugins = (clientConfig.plugins || []).concat([
	new ExtractTextPlugin('style.css'),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new webpack.optimize.OccurenceOrderPlugin()
]);

// backend (node)

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function (x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function (mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

var backendConfig = {
	name: 'server',
	context: path.resolve(__dirname, '../server'),
	entry: './index.js',
	target: 'node',
	output: {
		path: path.resolve(__dirname, '../dist/server'),
		filename: 'build.js',
		//publicPath: publicPath,
		libraryTarget: 'commonjs2'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel!eslint',
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},
	resolve: {
		extensions: ['', '.js']
		//modulesDirectories: [
		//	"app", "node_modules"
		//]
	},
	externals: nodeModules,
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	]
};

module.exports = [clientConfig, backendConfig];
