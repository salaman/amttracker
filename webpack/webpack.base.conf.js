var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	name: 'client',
	entry: ['./client/main.js'],
	output: {
		path: path.resolve(__dirname, '../dist/static'),
		publicPath: '/static/',
		filename: 'build.js'
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		alias: {
			'src': path.resolve(__dirname, '../src')
		}
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'babel!eslint',
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: './client/static' }
		])
	],
	vue: {
		loaders: {
			js: 'babel!eslint'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	}
};
