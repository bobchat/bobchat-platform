  const path = require('path');

  module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
      modules: ['node_modules', '../common/node_modules'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
