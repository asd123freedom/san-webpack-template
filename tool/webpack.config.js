/**
 * @file webpack
 * @author jady
 */

const webpack = require('webpack');
const path = require('path');
const rider = require('rider');
const projectPath = path.resolve(__dirname, '..');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const isDev = process.env.NODE_ENV === 'dev';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const envConfig = require('./config');

function getLoaders(isDev, ext) {
    let arr = ['css-loader'];
    if (ext) {
        arr.push(ext + '-loader');
    }
    if (isDev) {
        arr = arr.map(function (item) {
            return {
                loader: item,
                options: {sourceMap: true}
            };
        });
        arr.unshift('style-loader');
        return arr;
    }

    return ExtractTextPlugin.extract({
        use: arr,
        fallback: 'style-loader'
    });

}


/**
 * webpack config
 *
 * @type {Object}
 */
const config = {
    entry: path.join(projectPath, 'src/main.js'),
    output: {
        path: path.resolve(projectPath, 'dist'),
        filename: '[name].[hash].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? envConfig.build.assetsPublicPath
            : envConfig.dev.assetsPublicPath
    },
    resolve: {

        alias: {
            'san-mui': 'san-mui/lib',
            moment: 'moment/min/moment-with-locales.min.js',
            axios: 'axios/dist/axios.min.js'
        },

        extensions: ['.js', '.json', '.styl', '.css', '.html', '.san']
    },

    module: {
        noParse: [
            /moment-with-locales/,
            /node_modules\/(san|axios)\//
        ],
        rules: [
            {
                test: /\.san$/,
                loader: 'san-loader',
                options: {
                    loaders: {
                        stylus: getLoaders(isDev, 'stylus')
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(projectPath, 'src')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.html/,
                loader: 'html-loader',
                options: {
                    minimize: false
                }
            },
            {
                test: /\.css$/,
                use: getLoaders(isDev)
            },
            {
                test: /\.styl$/,
                use: getLoaders(isDev, 'stylus')
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.woff2?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    limit: '10000',
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|eot|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [

        new CaseSensitivePathsPlugin(),
        new webpack.LoaderOptionsPlugin({
            test: /\.(styl|san)$/,
            stylus: {
                default: {
                    use: [rider()]
                }
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template/index.html'
            // ejs-render-loader!template/${template}.ejs`;
        })
    ]
};

module.exports = config;
