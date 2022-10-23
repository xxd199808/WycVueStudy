'use strict';
import { utils as wiv } from '@/utils/wiv/index.js';
import { URLS_COM } from '@/urls.js';
//import router from '@/router.js';
import store from '@/store.js';
import { fSetToken } from './token.js';

/**
 * 跳转到登录页，即退出登录
 */
//路由跳转登录页
//const fGoLogin = function() {
//    store.commit('fSetUserInfo', {});
//    fSetToken(); //清空本地缓存的token
//    router.push({ // 导航到登录页
//        name: 'login'
//    });
//};
//使用 cas 登录
const fGoLogin = function() {
    let sUrl = location.href,
        sCasLogin = WISOFT_CONFIG.sCasLogin;
    //重新登录前，清除本地的用户相关信息
    store.commit('fSetUserInfo', {});
    fSetToken(); //清空本地缓存的token
    //登出时可能需要发送请求通知后端弃用当前 token
    sUrl = sUrl.replace(/ticket=[^&]+/, '')
        .replace(/[?&]$/, '')
        .replace(/#\/$/, '');
    window.location.replace(sCasLogin + (sCasLogin.indexOf('?') === -1 ? '?' : '&') + 'backUrl=' + encodeURIComponent(sUrl));
};

/**
 * 请求用户信息
 */
const fReqUserInfo = function() {
    return new Promise(function(resolve, reject) {
        wiv.fRequest({
            url: URLS_COM.d_getUser
        }).then((res) => {
            store.commit('fSetUserInfo', res.data);
            resolve(res);
        }, reject);
    });
};

/**
 * 退出登录
 */
const fLogout = function() {
    return new Promise(function(resolve, reject) {
        wiv.fRequest({
            url: URLS_COM.d_logout
        }).then((result) => {
            resolve(result);
            fGoLogin();
        }, reject);
    });
};


export {
    fGoLogin, //登录
    fReqUserInfo, //请求用户信息
    fLogout //退出登录
}