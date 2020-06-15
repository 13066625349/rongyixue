import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name:'',
        phone:'',
        babyName:'',
        regStatus:false,

    },
    mutations: {

        setName:(state,val)=>{
            state.name=val
        },
        setPhone:(state,val)=>{
            state.phone=val
        },
        setBabyName:(state)=>{
            state.babyName=val
        },
        setRegStatus:(state)=>{
            state.regStatus=true
        },
    },
    actions: {

    }
})
