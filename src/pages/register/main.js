import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import cookie from 'vue-cookie'
import baseURL from '../../static/js/domainName';
Vue.prototype.$host=baseURL.host;
import lrz from 'lrz'
console.log('打印',baseURL.baseURL)
axios.defaults.baseURL = baseURL.baseURL
//let REDIRECT_URI = baseURL.REDIRECT_URI
//localStorage['goodsSkuPriceId'])
Vue.prototype.$cookie = cookie;

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
import getParam from '../../static/js/getParam'
//请求封装
import request from '../../static/js/request'

//微信公众号信息
import wxInfo from '../../static/js/wxPublicInfo'


router.beforeEach(async (to,from,next)=>{
//  return false
   /* if(to.meta.isWeixin){
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin1 = ua.indexOf('micromessenger') != -1;
        if (isWeixin1) {
            weui-alert('请在浏览器中打开');
            next()
            return false;
        }else{
            next()
        }
    }*/

        //未跳转 先跳转到微信页面
    next();
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
