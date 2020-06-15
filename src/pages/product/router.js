import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            component:() => import('./views/product-index'),
            meta:{
                title:'产品'
            },

        },
        {
            path:'/productDetail',
            name:'productDetail',
            component:() => import('./views/productDetail/productDetail'),
            meta:{
                title:'产品详情'
            },

        },


    ]
})

