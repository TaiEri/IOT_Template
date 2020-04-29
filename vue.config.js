// vue.config.js
module.exports = {
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 部署应用包的基本URL
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾
  productionSourceMap: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  // webpack-dev-server 相关配置
  devServer: { // 设置代理
    hot: true, // 热加载
    host: '0.0.0.0', // ip地址
    port: 8085, // 端口
    https: false, // false关闭https，true为开启
    open: true, // 自动打开浏览器
    proxy: {
      '/api': { // 本地
        target: 'xxx',
        // 如果要代理 websockets
        ws: true,
        changeOrigin: true
      }
    }
  }
}
