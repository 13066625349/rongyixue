import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import baseURL from '../../static/js/domainName';
axios.defaults.baseURL = baseURL.baseURL;
//let REDIRECT_URI = baseURL.REDIRECT_URI
Vue.prototype.$host=baseURL.host;
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


router.beforeEach(async (to,from,next)=>{
    console.log(to)
 // next()
//  return false
    let url = window.location.href;
    if(to.meta.auth){
        if(Boolean(localStorage['isLogin'])){
            console.log('vuex中的手机号',store.state.phone)
            if(localStorage['phone']){
                next();
            }else{
                //weui.alert('请重新登陆');
                next('/login?isMyInfo=true')
            }
            //next()
        }else{
            next('/login?isMyInfo=true')
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
