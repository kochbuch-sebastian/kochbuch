const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://192.168.2.100:5000',
      },
    },
  },
  pwa: {
    name: 'kochbuch-sebastian',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
  },
  chainWebpack(config) {
    config.plugins.delete('prefetch');

    // and this line
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  },
};
