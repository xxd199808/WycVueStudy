import wiv from '@/utils/wiv/index.js';

//TODO 前端开发时修改
let PROD_DATA = false; //数据是否来自服务器，build 版本将强制设为 true

//初始化配置：window.WISOFT_CONFIG
const fInitConfig = function() {
    const BASE_URL = process.env.BASE_URL, //前端工程地址
        sOrigin = location.origin + '/';
    const sPrjHtName = 'vuePrj_ht'; //后台工程名
    const sPrjFrontName = 'vuePrj'; //前端工程名

    const oConfigUrl = {
        //后端服务工程的访问地址，从协议名到后端工程名 vuePrj_ht/，前端模拟数据路径对应：public/_json/
        xc: sOrigin + sPrjHtName + '/', //现场：url 参数 mode=xc
        cs: sOrigin + sPrjHtName + '/', //测试：url 参数 mode=cs
        ht: sOrigin + sPrjHtName + '/', //后台（开发）：url 参数 mode=ht
        //proxy: BASE_URL + sPrjHtName + '/', //联调，将通过代理映射到联调服务
        //local: BASE_URL + '_json/' //本地测试数据
        proxy: sOrigin + sPrjHtName + '/', //联调，将通过代理映射到联调服务，此处 sPrjHtName 应该与 vue.config.js 中 proxy
        local: sOrigin + '_json/' //本地测试数据
    };
    const PROD_ENV = process.env.VUE_APP_PROD === 'true'; //是否是 build 生成的版本
    let sMode,
        sServerPath; //后端服务的工程访问地址

    if (PROD_ENV) { //build 模式
        //从 url 获取 mode，默认为 xc：现场
        sMode = wiv.utils.fGetUrlParams().mode || 'xc';
        PROD_DATA = true;
    }
    else { //前端开发模式：联调/本地
        sMode = PROD_DATA ? 'proxy' : 'local';
    }
    sServerPath = oConfigUrl[sMode];

    window.WISOFT_CONFIG = {
        PROD_DATA: PROD_DATA, //是否访问后端服务请求数据
        sApiServer: sServerPath,
        //-- 项目特殊处理 BEGIN
        //sFrontServer: PROD_ENV ? sServerPath + sPrjFrontName + '/' : sOrigin, //有时需要获取前端项目的绝对路径
        //使用了 API 平台的项目中，前端开发时，需要将 frame 接口访问路径转移到 frame/ 后代理
        //sFrameServer: PROD_ENV ?
        //    sServerPath : sServerPath.replace(/vuePrj\/$/, 'frame/')
        onlinePreview: 'https://www.wisoft.com.cn/r/cms/www/default/img/wisoft/wisoft_logo.png?id=' //在线预览地址：http://192.10.110.24:9099/onlinePreview?url= TODO 项目中应请求 config 后，在 fRequestConfig 中修改此地址，修改后，此行应删除
        //-- 项目特殊处理 END
    };
}

//从服务端请求配置，扩展 window.WISOFT_CONFIG
const fRequestConfig = function() {
    return new Promise(function(fResolve, fReject) {
        //从约定的请求地址获取服务配置
        //wiv.utils.fRequest({
        //    //获取配置的接口地址
        //    url: WISOFT_CONFIG.sApiServer + 'front/getConfig'
        //}).then(({ data: oData }) => {
        //    //合并请求返回的配置
        //    Object.assign(WISOFT_CONFIG, {
        //        sCasServer: oData.sCasServer, //cas 服务地址
        //        sCasLogin: oData.sCasLogin, //cas 登录地址
        //        sAmapKey: oData.sAmapKey,
        //        onlinePreview: oData.onlinePreview //在线预览地址：http://192.10.110.24:9099/onlinePreview?url=
        //        //处理 link 为 oLink
        //        oLink: wiv.utils.fArr2Hash({
        //            data: oData.link || [],
        //            keyField: 'name',
        //            valField: 'url'
        //        })
        //    });

        fResolve();
        //});
    });
};

fInitConfig();

export { fRequestConfig }