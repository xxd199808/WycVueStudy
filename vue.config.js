/** 配置说明详见 https://cli.vuejs.org/zh/config/ **/

//联调时项目接口所在的服务地址前缀 TODO
const sHtServer = 'http://server:8080/vuePrj_ht/';

const path = require("path");
const axios = require("axios");
const sPrjName = 'vuePrj', //前端工程名，build 将生成：../front/vuePrj
    sPrjTitle = 'vuePrj 测试项目'; //首页 <title></title> 的文字
module.exports = {
    //部署应用包时的基本URL 在以下情况下，应当避免使用相对 publicPath:
    //1.当使用基于 HTML5 history.pushState 的路由时；
    //2.当使用 pages 选项构建多页面应用时。
    publicPath: process.env.VUE_APP_PROD === 'true' ?
        //'/publicVuePrj/'://生产环境发布版：前端工程运行在独立服务下，前后端单独发包
        './' : //生产环境发布版：前端产品随后端工程发包，请使用相对路径，避免部署时路径不同导致的问题
        '/', //前端开发测试环境
    outputDir: (process.env.NODE_ENV === 'production' ? '../front/' : '../test/') + sPrjName, //当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
    assetsDir: './assets/', //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    indexPath: 'index.html', //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
    filenameHashing: true, //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    lintOnSave: false, //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
    runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本
    transpileDependencies: [], //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    productionSourceMap: false, //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。 source map 是存储源代码与编译代码对应位置映射的信息文件
    //crossorigin: undefined,//设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    //integrity: false,//在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
    //configureWebpack: Object | Function //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。如果这个值是一个函数，则会接收被解析的配置作为参数。
    //chainWebpack: //是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = sPrjTitle;
                return args
            })
    },
    //css.modules: false, //默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    //css.extract: 生产环境下是 true，开发环境下是 false //是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    //css.sourceMap: false, //是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
    //css.loaderOptions: {}, //向 CSS 相关的 loader 传递选项
    devServer: { //如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
        before: function(app, server, compiler) { //解决开发时post请求本地json文件报404的问题
            app.post(/\/(_json|_data)/, function(req, res) {
                //拦截post请求本地文件，改成axios发起get请求
                axios.get('http://' + req.headers.host + req.originalUrl).then((response) => {
                    //请求成功返回数据
                    res.json(response.data)
                }).catch((e) => {
                    //请求失败返回错误码
                    res.status(e.response.status).end()
                })
            });
            //联调时，将 vuePrj_ht/_demo/ 代理为 _json/_demo/
            app.post(/\/vuePrj_ht\/_demo/, function(req, res) {
                axios.get('http://' + req.headers.host + req.originalUrl.replace(/\/vuePrj_ht\//, '/_json/')).then((response) => {
                    //请求成功返回数据
                    res.json(response.data)
                }).catch((e) => {
                    //请求失败返回错误码
                    res.status(e.response.status).end()
                })
            });
        },
        proxy: (function(aProxy) {
            const oProxy = {};
            aProxy.forEach(function(oItem, i) {
                oProxy[oItem.rule] = {
                    target: oItem.target + '(?!_demo)', //(?!_demo) 排除 _demo
                    changeOrigin: true, //如果接口跨域，需要进行这个参数配置
                    //ws: true, //proxy websockets
                    //pathRewrite方法重写url
                    pathRewrite: {
                        ['^' + oItem.rule]: '/'
                    },
                    //排除 _demo 的方法二
                    //bypass: function(req, res, proxyOptions) { //返回 false 或路径来跳过代理
                    //    //不代理 _demo
                    //    if (req.originalUrl.indexOf(oItem.rule + '_demo/') !== -1) {
                    //        return false;
                    //    }
                    //},
                }
            });
            return oProxy;
        })([
            //代理规则 TODO
            { rule: '/vuePrj_ht/', target: sHtServer }, //框架接口地址-后端框架的服务
        ])
    },
    //parallel: require('os').cpus().length > 1, //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    //pwa: //向 PWA 插件传递选项。
    //pluginOptions: //这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/css/config.less')
            ]
        }
    }
}