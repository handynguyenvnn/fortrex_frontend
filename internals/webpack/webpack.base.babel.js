/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     {
      //       // translates CSS into CommonJS},
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         localIdentName: '[path][name]__[local]--[hash:base64:5]',
      //       },
      //     },
      //     {
      //       // compiles Less to CSS
      //       loader: 'less-loader',
      //       options: {
      //         lessOptions: {
      //           // If you are using less-loader@5 please spread the lessOptions to options directly
      //           modifyVars: {
      //             'primary-color': '#002395',
      //           },
      //           javascriptEnabled: true,
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(less)$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {outputStyle: 'expanded'}
            }
          }
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm|mp3)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      '@components': path.resolve(__dirname, '../../app/components/'),
      '@style-components': path.resolve(
        __dirname,
        '../../app/elements/StyleComponents/',
      ),
      '@elements': path.resolve(__dirname, '../../app/components/Elements/'),
      '@complex-elements': path.resolve(
        __dirname,
        '../../app/components/ComplexElements/',
      ),
      '@containers': path.resolve(__dirname, '../../app/containers/'),
      '@private-pages': path.resolve(
        __dirname,
        '../../app/containers/PrivatePages/',
      ),
      '@common-pages': path.resolve(
        __dirname,
        '../../app/containers/CommonPages/',
      ),
      '@public-pages': path.resolve(
        __dirname,
        '../../app/containers/PublicPages/',
      ),
      '@utils': path.resolve(__dirname, '../../app/utils/'),
      '@store': path.resolve(__dirname, '../../app/store/'),
      '@configs': path.resolve(__dirname, '../../app/configs/'),
      '@services': path.resolve(__dirname, '../../app/services/'),
    },
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
