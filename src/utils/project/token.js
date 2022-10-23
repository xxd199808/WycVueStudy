'use strict';
import { URLS_COM } from '@/urls.js' //请求地址（公用）
import { utils as wiv } from '@/utils/wiv/index.js';
import { fGoLogin } from './user.js';
import router from '@/router.js';

//TODO 根据项目修改
const sTokenField = 'token'; //向后端发送请求时，header 上加 token 的字段名
const sLocalKeyToken = 'token'; //本地 storage 中保存 token 的字段名

//获取本地 token
const fGetToken = function() {
    return localStorage.getItem(sLocalKeyToken) || '';
};

//保存 token 到本地
const fSetToken = function(sToken) {
    if (sToken) {
        localStorage.setItem(sLocalKeyToken, sToken);
    }
    else {
        localStorage.removeItem(sLocalKeyToken); //一般登出时发送请求通知后端弃用当前 token
    }
};

//请求 token（根据项目需求修改），进入项目时应先完成 token 请求再进行其他操作
//示例：
//this.G_API.fReqToken().then(() => {
//    ....
//});
const fReqToken = function() {
    //提示并跳转到登录页
    const fPromptAndLogin = function(msg) {
        //防止重复跳转登录页
        if (router.currentRoute.name === 'login') {
            return;
        }
        if (msg) {
            wiv.fShowMsg(msg, {
                onClose: fGoLogin
            });
        }
        else {
            fGoLogin();
        }
    };
    return new Promise(function(fResolve, fReject) {
        const oParams = wiv.fGetUrlParams(),
            sTicket = oParams.ticket, //从url上获取 ticket 字段
            sTokenVal = fGetToken();
        //请求成功后执行
        const fSuccess = function({ data }) {
            if (data) { //权限验证通过，执行主请求
                fSetToken(data); //保存 token 到本地
                fResolve(data); //fRequestWithToken 中将根据传入的token值保存本地存储
            }
            else { //session 不可用
                fReject({ msg: '本地通行证已过期，前往登录' });
                fPromptAndLogin('本地通行证已过期，请重新登录!');
            }
        };
        //请求失败后执行
        const fError = function(oErrInfo) {
            const sMsg = oErrInfo ? oErrInfo.msg : undefined;
            fReject({ msg: sMsg || '获取 token 出错' });
            fPromptAndLogin(sMsg);
        };
        if (sTokenVal) {
            fResolve(sTokenVal);
        }
        else if (sTicket) { //使用本地通行证向服务器请求 session 状态
            wiv.fRequest(
            {
                url: URLS_COM.d_getTokenWithTicket, //请求地址，在 config 中配置
                data: {
                    ticket: sTicket
                }
            },
            {
                //根据请求参数判断身份验证时是否需要显示加载动画
                showLoading: {
                    key: 'userHandler',
                    content: '正在获取通行证，请稍候...'
                },
                silence: true
            }).then(fSuccess, fError)
        }
        else { //本地未保存通行证，直接显示登录页
            fReject({ msg: '本地未保存通行证' });
            fPromptAndLogin();
        }
    });
}

//前端本地测试，直接存入本地 token，避免跳到登录页
if (!WISOFT_CONFIG.PROD_DATA) {
    fSetToken('token');
}

export { sTokenField, fGetToken, fSetToken, fReqToken }