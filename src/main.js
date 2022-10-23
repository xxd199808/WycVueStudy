/**
 * url 参数
 * mode（仅当不同环境中服务部署的 path 不同时才需要配置）：不传为现场, 测试 cs，后台 ht。项目中将根据此配置决定请求地址的前缀
 */
//自执行初始化配置文件，必须立刻引入
import { fRequestConfig } from './utils/config.js';

import Vue from 'vue';
//第三方插件
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

//wiv 组件库（来源 wivPro）
import './utils/wiv/theme/index.css';
import wiv from './utils/wiv/index.js';
//import AMapLoader from '@amap/amap-jsapi-loader'; //地图

//项目资源
import './assets/css/common.less'; //公用less（请在项目工具、项目路由之前引入，防止因为路由引入 views 中的 vue，导致其中的样式在 common.less 之前生效）
import utilsProject from './utils/project/index.js'; //项目工具
import App from './App.vue';
import router from './router.js';
import store from './store.js';

//if (!WISOFT_CONFIG.showlog && console) {
//    //生产环境，禁用打印输出
//    console.error = console.log = function() {};
//}

//事件订阅
//Vue.prototype.$EventBus = new Vue();
Vue.prototype.G_API = {
    ...utilsProject
};
//生产环境不显示vue的提示
Vue.config.productionTip = false;

//安装插件
Vue.use(ElementUI);
Vue.use(wiv, {});

//全局变量增加方法，开放给外部 js
Object.assign(_WI, {
    ...wiv.utils
});
//根据分辨率设置html字号
wiv.utils.fSetRootFontsize(1920, 0);
//根据分辨率调整内容缩放
utilsProject.fInitScreenAutoScale(1920, 1080);

fRequestConfig().then(function() {
    if (process.env.VUE_APP_PROD === 'true') { //是否是 build 生成的版本
        //build 版本加入调试断点，仅在 build:test 时生效
        debugger;
    }
    //不含地图功能的初始化
    new Vue({
        store,
        router,
        render: (h) => h(App)
    }).$mount('#app');

    //包含地图功能的初始化，先加载地图资源后再初始化 vue 实例
    //AMapLoader.load({
    //        key: WISOFT_CONFIG.sAmapKey || '2476bc21e07c9f86505643e950aa35d0', //申请好的Web端开发者Key，首次调用 load 时必填
    //        //version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    //        plugins: ['AMap.Geocoder', 'AMap.Geolocation', 'AMap.ToolBar'], //需要使用的的插件列表，如比例尺'AMap.Scale'等
    //    })
    //    .catch(function(err) {
    //        throw (new Error('加载⾼德地图失败：' + err));
    //    })
    //    .finally(function() {
    //        new Vue({
    //            store,
    //            router,
    //            render: (h) => h(App)
    //        }).$mount('#app');
    //    });
});