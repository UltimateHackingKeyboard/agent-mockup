// var webpack = require("webpack");
var SvgStore = require('webpack-svgstore-plugin');
var webpackFailPlugin = require('webpack-fail-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var rootDir = path.resolve(__dirname, '../');

module.exports = {
    entry: ['es6-shim', 'zone.js', 'reflect-metadata', './src/boot.ts'],
    output: {
        path: rootDir + "/dist",
        filename: "uhk.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
        modulesDirectories: ['node_modules']
    },
    module: {
        preLoaders: [
            {
                test: /(.js|.ts)$/,
                loader: 'string-replace-loader',
                query: {
                    search: 'moduleId: module.id,',
                    replace: '',
                    flags: 'g'
                }
            }
        ],
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
            { test: /\.html$/, loader: 'html-loader' },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['raw-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        //   new webpack.optimize.UglifyJsPlugin({ minimize: true })
        new SvgStore(
            [
                rootDir + '/images/icons/**/*.svg'
            ],
            './',
            {
                name: 'assets/compiled_sprite.svg',
                chunk: 'app',
                svgoOptions: {
                    plugins: [
                        { removeTitle: true }
                    ]
                }
            }
        ),
        webpackFailPlugin,
        new CopyWebpackPlugin([
            { from: './src/*.html', flatten: true },
            { from: './src/*.js', flatten: true },
            {
                from: 'node_modules/font-awesome/css/font-awesome.min.css',
                to: 'vendors/font-awesome/css/font-awesome.min.css'
            },
            {
                from: 'node_modules/font-awesome/fonts',
                to: 'vendors/font-awesome/fonts'
            },
            {
                from: 'node_modules/bootstrap/dist',
                to: 'vendors/bootstrap'
            },
            {
                from: 'node_modules/jquery/dist/jquery.min.*',
                to: 'vendors/jquery',
                flatten: true
            },
            {
                from: 'node_modules/sortablejs/Sortable.min.js',
                to: 'vendors/sortablejs/Sortable.min.js'
            },
            {
                from: 'node_modules/select2/dist',
                to: 'vendors/select2'
            },
            {
                from: 'images',
                to: 'images'
            },
            {
                from: 'node_modules/handlebars/dist/handlebars.min.js',
                to: 'vendors/handlebars/handlebars.min.js'
            },
        ], {
                ignore: ['*.config.js']
            })
    ]

}
