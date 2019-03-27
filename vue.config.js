module.exports = {
  publicPath: './',

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
