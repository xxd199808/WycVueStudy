//数据请求接口的地址前缀（已完成数据对接的接口）接口文档中提供的地址不包含 SERVER_API
const SERVER_API = WISOFT_CONFIG.sApiServer;
//const sFrameServer = WISOFT_CONFIG.sFrameServer;
//数据请求接口的地址前缀（数据用前端工程中的模拟文件）
const SERVER_STATIC = process.env.BASE_URL + '_data/';
//const FRONT_SERVER = location.href.replace(/\/((\?|#).*)?$/, '') + '/'; //获取前端服务默认地址，结尾是 '/'。登录页绝对路径：FRONT_SERVER + '#/login'

/* 路径配置：p*-页面路径；d*-数据请求路径 */
export const URLS_COM = {
    BASE_URL: process.env.BASE_URL, //根目录
    //<img :src="URLS_COM.BASE_URL + '_data/icon/' + oDesc.desc" />
    // d_lastVer: SERVER_API + 'index/getVersion.json',//向服务器请求最新版本号
    d_login: SERVER_API + '_demo/com/opt.json', //登录请求
    //p_login: '/pages/login/login'//登录页地址
    d_getTokenWithTicket: SERVER_API + 'sso/getTokenWithTicket', //根据 ticket 获取 token
    d_getUser: SERVER_API + 'sso/getUser', //获取登录信息
    d_logout: SERVER_API + 'sso/logout', //退出登录
};
//模块0
export const URLS_MOD0 = {
    d_calendar: SERVER_STATIC + 'command/aqiCalendar.json', //日历
};
//模块1
export const URLS_MOD1 = {};
/**
 * 个别无法统一的情况（目前暂未遇到使用场景），可以通过判断 WISOFT_CONFIG.PROD_DATA 进行特殊处理
 * ！！强调！！ 推荐的做法： 尽可能在完成数据对接后， 将前端请求地址与后端请求地址统一， 修改 _json 中的目录资源。
 * */
// let URLS_MOD2 = {
//     d_getInfo: SERVER_API + 'ac/mod2/getInfo.do', //获取基本信息
// };
// if (!WISOFT_CONFIG.PROD_DATA) {
//     //前端请求地址
//     URLS_MOD2 = {
//         ...URLS_MOD2,
//         d_getInfo: SERVER_STATIC + 'mod2/getInfo.json', //获取基本信息
//     }
// }
// export { URLS_MOD2 }