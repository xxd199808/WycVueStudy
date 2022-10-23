import './interceptors.js'; //自执行：请求响应拦截处理
import * as autoscale from './autoscale.js';
import * as user from './user.js';
import * as token from './token.js';
import * as data from './data.js';
import * as file from './file.js';
import * as router from './router.js';

export default {
    ...autoscale,
    ...user,
    ...token,
    ...data,
    ...file,
    ...router,
}