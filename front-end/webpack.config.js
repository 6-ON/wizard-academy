const path = require('path')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const DotEnv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	devServer: {
		port: 3001,
		historyApiFallback: true,
		client :{
			overlay: {
				runtimeErrors: false,
			}
		}
	},
	entry: {
		main: './src/index.tsx',
	},
	devtool: 'inline-source-map',

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
					},
				],
			},
			{
				test: /\.tsx?$/,
				include: path.join(__dirname, 'src'),
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: isDevelopment ? 'tsconfig.json' : 'tsconfig.build.json',
							transpileOnly: true,
							...(isDevelopment && {
								getCustomTransformers: () => ({
									before: [ReactRefreshTypeScript()],
								}),
							}),
						},
					},
				],
			},
		],
	},
	plugins: [
		isDevelopment && new ReactRefreshPlugin(),
		new ForkTsCheckerWebpackPlugin(),
		new DotEnv(),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'styles.css',
			chunkFilename: 'styles.css',
		}),
		new BundleAnalyzerPlugin(),
	].filter(Boolean),
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
}
