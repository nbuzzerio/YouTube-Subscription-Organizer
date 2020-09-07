const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.jsx',
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            "presets": [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "node": "current"
                  }
                }
              ],
              "@babel/preset-react"
            ]
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
    ]
  },
}