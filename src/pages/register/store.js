import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        memberId:0,
        payResult:false,
        goodsSkuPriceId:localStorage['goodsSkuPriceId']?localStorage['goodsSkuPriceId']:0
    },
    mutations: {

        setMemberID:(state,val)=>{
            state.memberId=val
        },
        setPayResult:(state,val)=>{
            state.payResult=val;
            localStorage['payResult'] = val;
        },
        setGoodsSkuPriceId:(state,val)=>{
            state.goodsSkuPriceId=val;
            localStorage['goodsSkuPriceId'] = val;
        }
    },
    actions: {

    }
})
