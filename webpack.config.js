const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      // .JS(X)
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        resolve: { extensions: ['.js', '.jsx'] },
      },

      // .HTML
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
      },

      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.md$/,
        use: 'raw-loader',
      },

      // IMAGES & etc.
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: { noquotes: true, limit: 1024 },
        },
      },
    ],
  },
  plugins: [htmlPlugin],
};
