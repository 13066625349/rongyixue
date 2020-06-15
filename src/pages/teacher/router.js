import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            name:'teacher',
            component:() => import('./views/teacher-index'),
            meta:{
                title:'老师信息',
                auth:true
            },

        },
        {
            path:'/login',
            name:'login',
            component:() => import('./views/login/login'),
            meta:{
                title:'老师登陆'
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
            path:'/editPassword',
            name:'editPassword',
            component:() => import('./views/editPassword/editPassword'),
            meta:{
                title:'修改密码'
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
            path:'/uploadList',
            name:'uploadList',
            component:() => import('./views/upload/uploadList'),
            meta:{
                title:'视频上传列表'
            },
        },
        {
            path:'/upload',
            name:'upload',
            component:() => import('./views/upload/upload'),
            meta:{
                title:'上传学生作品'
            },
        },
        {
            path:'/uploadDetail',
            name:'uploadDetail',
            component:() => import('./views/upload/uploadDetail'),
            meta:{
                title:'修改学生上传信息'
            },
        },
        {
            path:'/uploadNext',
            name:'uploadNext',
            component:() => import('./views/upload/uploadNext'),
            meta:{
                title:'上传学生作品'
            },
        },
        {
            path:'/uploadNext1',
            name:'uploadNext1',
            component:() => import('./views/upload/uploadNext1'),
            meta:{
                title:'上传学生作品'
            },
        }

    ]
})

