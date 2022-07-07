const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8888,
    // 代理配置
    proxy: {
      '/v1_0': {
        target: 'http://toutiao.itheima.net',
        changeOrigin: true,
        pathRewrite: {
          '^/v1_0': ''
        }
      },
    }
  }
})
