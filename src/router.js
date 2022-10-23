import Vue from 'vue';
import Router from 'vue-router';
import index from './views/index/index.vue';
import login from './views/index/login.vue';
//import mode0view0 from './views/mod0/view0.vue';
//import mode1view0 from './views/mod1/view0.vue';

const routes = [{
        path: '/',
        name: 'index',
        component: index,
        //children: [
        //    {
        //        path: 'view0',
        //        component: mode0view0
        //    },
        //    {
        //        path: 'view0',
        //        name: 'mod1view0',
        //        component: mode1view0
        //    },
        //]
    },
    //{
    //    path: '/mod0',
    //    name: 'mod0',
    //    component: index,
    //    children: [
    //    {
    //        path: 'view0',
    //        component: mode0view0
    //    }]
    //},
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '*',
        redirect: '/'
    }
];

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch(err => err);
}

export default new Router({
    //mode: 'history',//若使用 history 模式，则 vue.config.js 中的 publicPath 不能使用相对路径，打包前必须确认发布路径
    base: process.env.BASE_URL,
    routes
})