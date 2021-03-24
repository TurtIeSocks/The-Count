const path = require('path')

module.exports = {
  extensions: ['.js', '.jsx', '.scss'],
  alias: {
    '@components': path.resolve(__dirname, './src/components'),
    '@services': path.resolve(__dirname, './src/services'),
  },
}
