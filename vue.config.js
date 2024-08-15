const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.VUE_APP_PORT || 7070,
    // 개발 환경에서만 프록시 설정 사용
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    } : {}
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(true)
      })
    ]
  }
});