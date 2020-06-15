import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name:'',
        babyName:'',
        regStatus:false,
        token:localStorage['token']?localStorage['token']:'',
        isLogin:localStorage['isLogin']?localStorage['isLogin']:'',
        phone:localStorage['phone']?localStorage['phone']:'',

    },
    mutations: {

        setName:(state,val)=>{
            state.name=val
        },
        /*setPhone:(state,val)=>{
            state.phone=val
        },*/
        setBabyName:(state)=>{
            state.babyName=val
        },
        setRegStatus:(state)=>{
            state.regStatus=true
        },
        setToken:(state,val)=>{
            state.token=val;
            localStorage['token']=val;
        },
        setIsLogin:(state,val)=>{
            state.isLogin=val;
            localStorage['isLogin']=val;

        },
        setPhone:(state,val)=>{
            state.phone=val;
            localStorage['phone']=val;
        },
    },
    actions: {

    }
})
