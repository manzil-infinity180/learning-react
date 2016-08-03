var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: "dist/assets",
        filename: "bundle.min.js",
        publicPath: "/assets/",
        sourceMapFilename: 'bundle.min.map'
    },
    devtool: '#source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel'],
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'

            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.min.css"),

        // Uncomment to Minify Code and remove warning about environment
        //
        //new webpack.DefinePlugin({
        //    "process.env": {
        //        NODE_ENV: JSON.stringify("production")
        //    }
        //}),

        //new webpack.optimize.UglifyJsPlugin({
        //    sourceMap: true,
        //    warnings: false,
        //    mangle: false
        //}),

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        })
    ]
};