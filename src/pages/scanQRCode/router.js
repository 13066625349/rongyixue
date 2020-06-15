import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
export default new Router({
    routes: [
        {
            path:'/',
            name:'scanQRCode',
            component:() => import('./views/scanQRCode-index'),
            meta:{
                title:'扫码支付'
            }
        }

    ]
})