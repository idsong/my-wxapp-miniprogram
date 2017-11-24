
import { resolve } from 'path';
import { DefinePlugin, EnvironmentPlugin, optimize } from 'webpack';
import WXAppWebpackPlugin from 'wxapp-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production';

const relativeFileLoader = (ext = '[ext]') => [
	{
		loader: 'file-loader',
		options: {
			publicPath: '',
			useRelativePath: true,
			name: `[name].${ext}`,
			emitFile: false,
		},
	},
	{
		loader: 'file-loader',
		options: {
			publicPath: '',
			context: resolve('src'),
			name: `[path][name].${ext}`,
		},
	},
];

export default () => {
	return {
		entry: {
			app: './src/app.js'
		},
		output: {
			filename: '[name].js',
			publicPath: '/',
			path: isDev ? resolve('dist') : resolve('build'),
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: /src/,
					use: [
						'babel-loader',
						'eslint-loader',
					]
				},
				{
					test: /\.wxs$/,
					include: /src/,
					use: [
						...relativeFileLoader(),
						'babel-loader',
						'eslint-loader',
					]
				},
				{
					test: /\.(scss|wxss)$/,
					include: /src/,
					use: [
						...relativeFileLoader('wxss'),
						'extract-loader',
						'css-loader',
						'sass-loader'
					],
				},
				{
					test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
					include: /src/,
					loader: 'url-loader',
					options: {
						limit: 10000,
						fallback: 'file-loader',
						name: './images/[name].[ext]'
					}
				},
				{
					test: /\.json$/,
					include: /src/,
					use: relativeFileLoader(),
				},
				{
					test: /\.wxml$/,
					include: resolve('src'),
					use: [
						...relativeFileLoader(),
						{
							loader: 'wxml-loader',
							options: {
								root: resolve('src'),
							},
						},
					],
				},
			],
		},
		plugins: [
			new EnvironmentPlugin({
				NODE_ENV: 'development',
			}),
			new DefinePlugin({
				__DEV__: isDev,
			}),
			new WXAppWebpackPlugin(),
			new optimize.ModuleConcatenationPlugin(),
			!isDev && new StylelintPlugin(),
			new CopyWebpackPlugin([{
				from: 'src/*.json',
				flatten: true
			}])
		].filter(Boolean),
		devtool: isDev ? 'source-map' : false,
		resolve: {
			modules: [resolve(__dirname, 'src'), 'node_modules'],
		},
		watchOptions: {
			ignored: /dist|build/,
			aggregateTimeout: 300,
		},
	};
};
