import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            component:() => import('./views/course-index'),
            meta:{
                title:'名师名讲'
            },

        },
        {
            path:'/courseDetail',
            name:'courseDetail',
            component:() => import('./views/courseDetail/courseDetail'),
            meta:{
                title:'名师名讲详情',
                auth:true
            },

        },
        {
            path:'/courseList',
            name:'courseList',
            component:() => import('./views/courseList/courseList'),
            meta:{
                title:'课程'
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
            path:'/loginNext',
            name:'loginNext',
            component:() => import('../../components/login/loginNext'),
            meta:{
                title:'添加学生'
            },
        },
    ]
})

