import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token:localStorage['token']?localStorage['token']:'',
        isLogin:localStorage['isLogin']?localStorage['isLogin']:'',
        phone:localStorage['phone']?localStorage['phone']:''
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
        }

    },
    actions: {

    }
})
