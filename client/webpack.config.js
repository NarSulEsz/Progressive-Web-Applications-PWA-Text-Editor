const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'foo',
        template: './index.html',
      }),
      new InjectManifest({
        swSrc: './src/src-sw.js', // Path to custom service worker file
        swDest: 'src-sw.js', // Output service worker file in the dist folder
      }),
      new WebpackPwaManifest({
        name: 'Your App Name',
        short_name: 'App',
        description: 'Your app description',
        background_color: '#ffffff',
        theme_color: '#000000',
        display: 'standalone',
        start_url: '.',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/icon.png'), // Path to app icon
            sizes: [96, 128, 192, 256, 384, 512], // Different sizes
            destination: path.join('icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
