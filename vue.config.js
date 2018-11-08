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

  devServer: {
    before(app) {
      app.use((req, res, next) => {
        // eslint-disable-next-line no-console
        console.log(`[${req.method}]`, req.path);
        next();
      });
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: '^/main', to: '/main.html' },
        { from: '^/demo', to: '/demo.html' },
        { from: /./, to: '/404.html' },
      ],
    },
  },
};
