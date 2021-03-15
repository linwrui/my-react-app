/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-var-requires */
const {createProxyMiddleware} = require('http-proxy-middleware');
 
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/bing-api', {
      target: 'https://cn.bing.com',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/bing-api': '/',
      },
    }),
    createProxyMiddleware('/weather', {
      target: 'https://tianqiapi.com',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/weather': '/',
      },
    }),
  );
};
