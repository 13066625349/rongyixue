import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import baseURL from '../../static/js/domainName'
axios.defaults.baseURL = baseURL.baseURL
Vue.prototype.axios=axios;
//适配
import 'static/js/flexible'


Vue.use(require('vue-wechat-title'))
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

//reset
import 'static/css/reset.css'
//jsapi
let jsAPIArr = ['previewImage','chooseImage','getLocalImgData','getLocation']

router.beforeEach(async (to,from,next)=>{
  next()
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
