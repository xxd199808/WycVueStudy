'use strict';
import { utils as wiv } from '@/utils/wiv/index.js';

//跳转到 WISOFT_CONFIG.oLink 对应的地址，跳转时保留 url 参数
const fGoLink = function(sType) {
    const sUrl = WISOFT_CONFIG.oLink[sType];
    if (sUrl) {
        if (sType === 'yzt_gfjg') { //固废监管跳转到第三方应用
            location.href = sUrl;
        }
        else {
            const oUrlParams = wiv.fGetUrlParams();
            let aParams = [];
            for (var name in oUrlParams) {
                aParams.push(name + '=' + oUrlParams[name]);
            }
            location.href = sUrl + (aParams.length ? ('?' + aParams.join('&')) : '');
        }
    }
};

//在浏览器新标签页中打开详情页
const fOpenDetail = function(oThis, oItem) {
    const router = oThis.$router;
    const route = oThis.$route;

    window.open(router.resolve({
        name: 'detail', //路由名称
        params: { id: oItem.id }, //参数
        query: route.query,
        hash: route.hash,
    }).href, '_blank');

    //--- router.js 中添加路由定义
    //{
    //    path: '/detail/:id',
    //    name: 'detail',//路由名称
    //    component: detail
    //},
    //--- vue 中调用
    //this.G_API.fOpenDetail(this, {id:'001'});
    //--- 目标页获取参数
    //this.$route.params.id
    //--- 浏览器中访问目标页
    //http://localhost:8080/#/detail/001
};

export {
    fGoLink,
    fOpenDetail,
}