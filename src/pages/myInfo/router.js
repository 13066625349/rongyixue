import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            name:'myInfo',
            component:() => import('./views/myInfo-index'),
            meta:{
                title:'个人信息',
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
        },
        {
            path:'/regNext',
            name:'regNext',
            component:() => import('../../components/reg/regNext'),
            meta:{
                title:'添加学生'
            },
        },
        {
            path:'/editPassword',
            name:'editPassword',
            component:() => import('./views/editPassword/editPassword'),
            meta:{
                title:'修改密码'
            },
        },
        {
            path:'/editInfo',
            name:'editInfo',
            component:() => import('./views/editInfo/editInfo'),
            meta:{
                title:'修改个人信息'
            },
        },
        {
            path:'/payRecord',
            name:'payRecord',
            component:() => import('./views/payRecord/payRecord'),
            meta:{
                title:'交费记录'
            },
        },
        {
            path:'/entries',
            name:'entries',
            component:() => import('./views/entries/entries'),
            meta:{
                title:'近期活动'
            },
        },
        {
            path:'/entries/entriesDetail',
            name:'entriesDetail',
            component:() => import('./views/entries/entriesDetail/entriesDetail'),
            meta:{
                title:'参赛作品'
            },
        },
        {
            path:'/activitiesDetail',
            name:'activitiesDetail',
            component:() => import('./views/activitiesDetail/activitiesDetail'),
            meta:{
                title:'活动详情'
            },
        },
        {
            path:'/entries/entriesList',
            name:'entriesList',
            component:() => import('./views/entries/entriesDetail/entriesList'),
            meta:{
                title:'参赛宝宝'
            },
        },
        {
            path:'/babyList',
            name:'babyList',
            component:() => import('./views/babyList'),
            meta:{
                title:'选择宝宝'
            },
        },
        {
            path:'/entriesVideo',
            name:'entriesVideo',
            component:() => import('./views/entries/entriesDetail/entriesVideo'),
            meta:{
                title:'参赛视频'
            },
        }


    ]
})

