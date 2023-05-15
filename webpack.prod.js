// Production mode webpack config

// Common config / merge
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Import an array containing strings of folders/files to be generated
const { pages } = require('./webpack.variables');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    ],
            },
        ],
    },
    // Creates html file for every entry point, outputs to the folder of the same name
    // Additional plugins may be concatted to the end of the array or placed in the original array
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash].css",
        }),
    ].concat(pages.map((page, index) => {
        return new HtmlWebpackPlugin({
            template: './src/' + page + '/' + page + '.html',
            filename: page + '.html',
            inject: true,
            chunks: [page],
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true,
            }

        })
    })),
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ],
    },
});
