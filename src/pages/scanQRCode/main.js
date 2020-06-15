import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import lrz from 'lrz'
axios.defaults.baseURL = baseURL.baseURL;
//let REDIRECT_URI = baseURL.REDIRECT_URI
let REDIRECT_URI = 'http%3a%2f%2fjxc.zxceo888.cn%2fcustomer%2fdist11%2fpayRecord.html';
//Vue.prototype.GLOBAL = REDIRECT_URI;
Vue.prototype.axios=axios;
//适配
import 'static/js/flexible'
let jsAPIArr = ['scanQRCode'];
Vue.use(require('vue-wechat-title'));
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp);

//reset
import 'static/css/reset.css'

//获取url参数
import getParam from 'static/js/getParam'
//请求封装
import request from 'static/js/request'

//微信公众号信息
import wxInfo from 'static/js/wxPublicInfo'
//js注册
import wxReady from '../../static/js/wxReady'
import baseURL from "../../static/js/domainName";


router.beforeEach(async (to,from,next)=>{

    let url = location.href;
    console.log(url);
    wxReady( jsAPIArr, () => {

        next()
    }, () => {})



//  return false

});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
