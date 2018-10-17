const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: [
        './src/index.js',
        './src/scss/index.scss'
    ],
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'js/bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: true,
                            url: false
                        }
                    },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/style.bundle.css',
            allChunks: true,
        }),
        new CopyWebpackPlugin([
            // {
            // from: './src/fonts',
            // to: './fonts'
            // },
            // {
            //     from: './src/favicon',
            //     to: './favicon'
            // },
            {
                from: './src/images',
                to: './images'
            },
            // {
            //     from: './src/uploads',
            //     to: './uploads'
            // }
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './public',
        hot: true
    }
};