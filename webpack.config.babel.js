import path from 'path'
import webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import * as config from './config'

const vueLoaders = {
  html: 'pug-loader',
  css: ExtractTextPlugin.extract({
    use: 'css-loader',
    fallback: 'vue-style-loader'
  }),
  scss: 'vue-style-loader!css-loader!sass-loader',
  sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
}

export default {
  entry: './app/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, ...config.DIST_PATH)
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new HtmlPlugin({
      title: config.TITLE,
      template: 'app/app.pug'
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader', fallback: 'style-loader'
        })
      }, {
        test: /\.s[a|c]ss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'], fallback: 'style-loader'
        })
      }, {
        test: /\.pug$/,
        loader: 'pug-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: { loaders: vueLoaders }
      }, {
        test: /\.(png|jpe?g|gif|svg|ttf|woff2?|eot)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]' }
      }
    ]
  },

  performance: { hints: false },
  resolve: { alias: { 'vue$': 'vue/dist/vue.common.js' } },

  devtool: '#eval-source-map',
  devServer: {
    hot: true,
    port: 8888,
    host: '0.0.0.0',
    historyApiFallback: true,
    proxy: { '**': `http://localhost:${config.PORT}` }
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ])
}
