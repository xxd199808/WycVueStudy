import axios from 'axios';
import { fGoLogin } from './user.js';
import { sTokenField, fGetToken } from './token.js';

const PROD_DATA = WISOFT_CONFIG.PROD_DATA; //数据是否来自服务器，在 src/utils/config.js 中配置

// 添加请求拦截器
axios.interceptors.request.use(
    function(oAxiosOpts) {
        let { data: oReqData, url: sUrl, headers: oHeader } = oAxiosOpts;
        let sFilter;

        //前端模拟数据时，将后缀统一替换为 json
        if (!PROD_DATA) {
            sUrl = sUrl.replace(/([^/.]+)(\.[^/.]+)?$/, '$1.json'); //替换后缀
        }

        //现场维护的数据：将请求参数 _filter 改为文件名后缀
        if (oReqData && Object.prototype.toString.call(oReqData._filter) === '[object Array]') {
            sFilter = oReqData._filter.join('_').replace(/:/g, '-');
            if (/[^_]/g.test(sFilter)) {
                //静态数据，默认数据为 xxxx.json；若定义了过滤条件，则修改请求地址为 xxxx_<filter1>_<filter2>_....json
                sUrl = sUrl.replace('.json', '_' + sFilter + '.json');
            }
        }
        oAxiosOpts.url = sUrl;

        //获取本地 token，追加到 header
        oHeader[sTokenField] = fGetToken(); //可能是请求 token 后调用的 fRequest()，需要重新读取 token

        return oAxiosOpts;
    },
    function(error) {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        //console.log('success', response);
        return response
    },
    function(error) {
        //console.log('error', error.message, error.request, error.response);
        if (error.response) {
            if (error.response.status === 403) {
                fGoLogin();
                error.silence = true; //告知组件不要弹出异常报错
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);