// Development mode webpack config

// Common config / merge
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Import an array containing strings of folders/files to be generated
const { pages } = require('./webpack.variables');


module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    // Creates html file for every entry point, outputs to the folder of the same name
    // Additional plugins may be concatted to the end of the array or placed in the original array
    plugins: [].concat(pages.map((page) => {
        return new HtmlWebpackPlugin({
            template: './src/' + page + '/' + page + '.html',
            filename: page + '.html',
            inject: true,
            chunks: [page],

        })
    })),
});
