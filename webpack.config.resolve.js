const path = require('path')

module.exports = {
  extensions: ['.js', '.jsx', '.scss'],
  alias: {
    '@assets': path.resolve(__dirname, './src/assets'),
    '@components': path.resolve(__dirname, './src/components'),
    '@hooks': path.resolve(__dirname, './src/hooks'),
    '@services': path.resolve(__dirname, './src/services'),
  },
}
