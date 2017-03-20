import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
    entry: './app/index.js',
    output: {
        publicPath: '/dist/',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        html: 'pug-loader',
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader",
                    fallback: "style-loader"
                })
            }, {
                test: /\.(png|jpe?g|gif|svg|ttf|woff2?|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    devServer: {
        host: '0.0.0.0',
        historyApiFallback: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'production'){
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: { warnings: false }
        }),
        new webpack.LoaderOptionsPlugin({ minimize: true })
    ]);
}
