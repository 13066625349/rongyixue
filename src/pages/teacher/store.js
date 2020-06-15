import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token:localStorage['token']?localStorage['token']:'',
        expertToken:localStorage['expertToken']?localStorage['expertToken']:'',
        expertIsLogin:localStorage['expertIsLogin']?localStorage['expertIsLogin']:'',
        phone:localStorage['phone']?localStorage['phone']:'',
        expertInfo:{}
        //phone:''
    },
    mutations: {
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

        setExpertToken:(state,val)=>{
            state.token=val;
            localStorage['expertToken']=val;
        },
        setExpertIsLogin:(state,val)=>{
            state.token=val;
            localStorage['expertIsLogin']=val;
        },
        setClassInfo:(state,val)=>{
            state.classesInfo=val;
            localStorage['classesInfo']=val;
        },

    },
    actions: {

    }
})
