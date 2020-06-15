import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            component:() => import('./views/activities-index'),
            meta:{
                title:'比赛活动'
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
            path:'/activitiesSignUp',
            name:'activitiesSignUp',
            component:() => import('./views/activitiesSignUp/activitiesSignUp'),
            meta:{
                title:'在线报名'
            },

        }

    ]
})

