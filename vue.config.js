module.exports = {
  baseUrl: './',

  pages: {
    index: 'src/pages/index/main.js',
    corp: 'src/pages/corp/main.js',
    student: 'src/pages/student/main.js',
  },

  configureWebpack: {
    externals: {
      weui: 'weui',
      vue: 'Vue',
    },
  },

  pluginOptions: {
    axios: {
      // 插件可以作为 `options.pluginOptions.axios` 访问这些选项。
      baseUrl: '/weixin/api',
    },
  },

  devServer: {
    before(app) {
      app.use((req, res, next) => {
        // eslint-disable-next-line no-console
        console.log(`[${req.method}]`, req.path);
        next();
      });
    },
    proxy: {
      '/weixin': {
        // target: 'http://localhost:9000',
        target: 'http://smart.jilinjobswx.cn',
      },
    },
  },
};
