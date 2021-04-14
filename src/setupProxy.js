//Proxy用法是让我们创建一个API代理器

//http-proxy-middleware是一个中间件
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(createProxyMiddleware('/res', {
        target: 'http://10.65.10.187:10000',
        changeOrigin: true
    }))

};