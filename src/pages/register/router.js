import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            component:() => import('./views/register-index'),
            meta:{
                title:'支付',
                isWeixin:true
            },

        }

    ]
})

