import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import lrz from 'lrz'
axios.defaults.baseURL = baseURL.baseURL
//let REDIRECT_URI = baseURL.REDIRECT_URI
let REDIRECT_URI = 'http%3a%2f%2fjxc.zxceo888.cn%2fcustomer%2fdist11%2fpayRecord.html'
//Vue.prototype.GLOBAL = REDIRECT_URI;
Vue.prototype.axios=axios
//适配
import 'static/js/flexible'


Vue.use(require('vue-wechat-title'))
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

//reset
import 'static/css/reset.css'

//获取url参数
import getParam from 'static/js/getParam'
//请求封装
import request from 'static/js/request'

//微信公众号信息
import wxInfo from 'static/js/wxPublicInfo'
//js注册
import wxReady from 'static/js/wxReady'
import baseURL from "../../static/js/domainName";


router.beforeEach(async (to,from,next)=>{
    console.log(to)
    // next()
//  return false
    let url = window.location.href;
   /* console.log(url.split('?').length);
    if(url.split('?').length === 1){
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxInfo.wxAppId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    }else{
        next();
    }*/
    if(to.meta.auth){
        console.log(store.state.phone)
        if(Boolean(localStorage['expertIsLogin'])){
            if(localStorage['expertToken']){
                next();
            }else{
                //weui.alert('请重新登陆');
                next('/login')
            }
            //next()
        }else{
            next('/login')
        }
    }else{
        next()
    }

});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
