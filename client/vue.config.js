const path = require('path');

module.exports = {
  outputDir: 'dist',
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
      swSrc: './src/service-worker.js',
    },
  },
};
