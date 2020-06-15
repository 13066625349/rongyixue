import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        openId:'',
        sessionId:'',
        projectId:'',
        jssdkStatus:false,
        bindStatus:false
    },
    mutations: {
        wxOpenId:(state,val)=>{
            state.openId=val
        },
        setSessionId:(state,val)=>{
            state.sessionId=val
        },
        setProjectId:(state,val)=>{
            state.projectId=val
        },
        setJSSDKstatus:(state)=>{
            state.jssdkStatus=true
        },
        setBindStatus:(state)=>{
            state.bindStatus=true
        },
    },
    actions: {

    }
})
