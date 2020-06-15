import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            name:'payRecord',
            component:() => import('./views/payRecord-index'),
            meta:{
                title:'交费记录',
                auth:true
            },

        },
        {
            path:'/login',
            name:'login',
            component:() => import('../../components/login/login'),
            meta:{
                title:'登陆'
            },

        },
        {
            path:'/reg',
            name:'reg',
            component:() => import('../../components/reg/reg'),
            meta:{
                title:'注册'
            },
        }

    ]
})

