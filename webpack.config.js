// Common webpack config

// Import an array of strings for folders/files to be generated
const { pages } = require('./webpack.variables');

const path = require('path');

module.exports = {
    // Returns an object with entry points, formed from the pages array
    entry: pages.reduce((configured, page) => {
        configured[page] = './src/' + page + '/' + page + '.js';
        return configured;
    }, {}),
    // Outputs folder for each entry point
    output: {
        filename: '[name].bundle-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    // Split chunks for accessibility
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [

            // html-loader processes asset management in html source files
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
}
