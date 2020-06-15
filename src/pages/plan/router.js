import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            component:() => import('./views/plan-index'),
            meta:{
                title:'千园计划'
            },

        },
        {
            path:'/planDetail',
            name:'planDetail',
            component:() => import('./views/planDetail/planDetail'),
            meta:{
                title:'千园计划详情'
            },

        },
        {
            path:'/planCourseDetail',
            name:'planCourseDetail',
            component:() => import('./views/planCourseDetail/planCourseDetail'),
            meta:{
                title:'课程详情',
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
            path:'/loginNext',
            name:'loginNext',
            component:() => import('../../components/login/loginNext'),
            meta:{
                title:'添加学生'
            },
        },
    ]
})

