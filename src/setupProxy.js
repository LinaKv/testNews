const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://a0830433.xsph.ru/",
      changeOrigin: true,
    })
  );
};
