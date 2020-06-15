<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
        <!--查询-->
        <div class="cha">
            <div>
                全部
                <input type="radio" name="record" @click="chaxun('showAll')"  checked>
            </div>
            <div>
                已支付
                <input type="radio" name="record"  @click="chaxun('showPay')" >
            </div>
            <div>
                未支付
                <input type="radio" name="record"  @click="chaxun('showUnPay')" >
            </div>
        </div>
		<!-- 交费记录 -->
        <div class="recode-wrap" v-for="(item,index) in payList" :key="index" v-if="showAll" >
            <div class="content" >
                <div class="img">
                    <div class="img-wrap">
                        <img src="./img/head.png" alt="">
                    </div>
                </div>
                <div class="payInfo">
                    <div class="payTitle">{{item.goodsSpu.goodsName}}</div>
                    <div class="payClassHour"></div>

                    <div v-show="item.actualPayment==null" class="payTime">{{item.orderTime}}</div>
                    <div v-show="item.actualPayment" class="payTime">{{item.payTime}}</div>
                </div>
                <div class="payPrice">
                    ￥{{item.goodsTotal/100}}
                    <span v-show="item.actualPayment==null">未支付</span>
                    <span  v-show="item.actualPayment">已支付</span>
                </div>
            </div>
        </div>
        <div class="recode-wrap" v-for="(item,index) in payListed" :key="index" v-if="showPay">
            <div class="content">
                <div class="img">
                    <div class="img-wrap">
                        <img src="./img/head.png" alt="">
                    </div>
                </div>
                <div class="payInfo">
                    <div class="payTitle">{{item.goodsSpu.goodsName}}</div>
                    <div class="payClassHour"></div>

                    <div v-show="item.actualPayment==null" class="payTime">{{item.orderTime}}</div>
                    <div v-show="item.actualPayment" class="payTime">{{item.payTime}}</div>
                </div>
                <div class="payPrice">
                    ￥{{item.goodsTotal/100}}
                    <span v-show="item.actualPayment==null">未支付</span>
                    <span v-show="item.actualPayment">已支付</span>
                </div>
            </div>
        </div>
        <div class="recode-wrap" v-for="(item,index) in unPayList" :key="index" v-if="showUnPay">
            <div class="content">
                <div class="img">
                    <div class="img-wrap">
                        <img src="./img/head.png" alt="">
                    </div>
                </div>
                <div class="payInfo">
                    <div class="payTitle">{{item.goodsSpu.goodsName}}</div>
                    <div class="payClassHour"></div>

                    <div v-show="item.actualPayment==null" class="payTime">{{item.orderTime}}</div>
                    <div v-show="item.actualPayment" class="payTime">{{item.payTime}}</div>
                </div>
                <div class="payPrice">
                    ￥{{item.goodsTotal/100}}
                    <span v-show="item.actualPayment==null">未支付</span>
                    <span v-show="item.actualPayment">已支付</span>
                </div>
            </div>
        </div>
        <div class="empty" v-if="payList.length==0">
            <img src="./img/empty.png" alt="">
            <span>暂无交费记录</span>
        </div>

	</div>
</template>

<script>
	import request from '../../../static/js/request'
	import result from '../../../static/js/result'
	export default {
		data() {
			return {
                payList :[],//全部交费记录数组
                payListed:[],//已交费记录数组
                unPayList:[],//未支付交费记录数组
                showAll:true,
                showPay:false,
                showUnPay:false,
			}
		},
		mounted() {

		},
		created() {
            this.getUserInfo();
            this.getInfo();
            console.log(this.payList)
		},
		methods: {
            async getUserInfo(){
                let params  = {}

               /* let headers = {
                    contentType:'application/x-www-form-urlencoded',
                    token:this.$store.state.token
                }*/
                let getUserInfo = await request('/api/token/base/info/getUser?access_token='+this.$store.state.token,
                    'get',params,'application/x-www-form-urlencoded')
                // loading.hide()
                let info = result(getUserInfo)
                // loading.hide()
                if(getUserInfo.code == 500){
                    this.$store.commit('setPhone', '');
                }
                if(!info) return;
                //console.log('获取电话号成功信息',getUserInfo)
                this.$store.commit('setPhone', getUserInfo.msg);
            },
            async getInfo(){
                let params = {
                    phone:this.$store.state.phone,
                    access_token:this.$store.state.token
                };
                /*let headers = {
                    contentType:'application/x-www-form-urlencoded',
                    token:this.$store.state.token
                };*/
                console.log(this.$store.state.token);
                let myInfo = await request('/api/token/base/info/select',
                    'post', params, 'application/x-www-form-urlencoded');
                // loading.hide()
                let res = result(myInfo);
                // loading.hide()
                if(!res) return;
                //console.log('个人信息',myInfo);
                if(myInfo){
                    this.getOrderInfo(myInfo.data.id)
                }
            },
            async getOrderInfo(id){
                let params = {
                    id:id,
                    access_token:this.$store.state.token
                };
                console.log(params);
                /*let headers = {
                    contentType:'application/x-www-form-urlencoded',
                    token:this.$store.state.token
                };*/
                //console.log(this.$store.state.token);
                let orderInfo = await request('/api/token/order/info/listMember',
                    'post', params,'application/x-www-form-urlencoded');
                // loading.hide()
                let res = result(orderInfo);
                // loading.hide()
                if(!res) return;
                //console.log('交费记录',orderInfo);
                this.payList = orderInfo.data.reverse()//倒叙循环交费记录,最新记录在最上方;
                for(let item of this.payList){
                    if(item.actualPayment!=null){
                        this.payListed.push(item);
                    }else{
                        this.unPayList.push(item);
                    }
                }
                //console.log('已支付数组',this.payListed)
                //console.log('未支付数组',this.unPayList)
            },
            chaxun(e){
                console.log(e);
                if(e == 'showAll'){
                    this.showAll = true;
                    this.showPay = false;
                    this.showUnPay = false;
                }else if(e == 'showPay'){
                    this.showPay = true;
                    this.showAll = false;
                    this.showUnPay = false
                }else if(e == 'showUnPay'){
                    this.showUnPay = true;
                    this.showAll = false;
                    this.showPay = false;
                }
            }
		}
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";
	.main {
		width: 100%;
		height: 100%;
        box-sizing: border-box;
		position: relative;
        overflow-y: scroll;
        padding: 30rem / @rootFontSize;
		top: 0;
		left: 0;
		input::-webkit-input-placeholder {
			color: #999;
		}
        .content{
            margin-bottom: 30rem / @rootFontSize;
            padding: 30rem / @rootFontSize;
            display: flex;
            justify-content: space-between;
            box-shadow: 0 0 16rem/ @rootFontSize #bababa;
            border-radius: 8px;
            .img{

                width: 100rem / @rootFontSize;
                height: 100%;
                .img-wrap{
                    width: 100%;
                    height: 100rem / @rootFontSize;
                    img{
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .payInfo{
                width: 45%;

                .payTitle{
                    line-height: 36rem / @rootFontSize;
                    margin-bottom: 30rem / @rootFontSize;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    overflow:hidden;
                }
                .payClassHour{
                    margin-bottom: 25rem / @rootFontSize;
                    color: #959595;
                }
                .payTime{
                    color: #959595;
                }
            }
            .payPrice{
                width: 20%;
                color: #ff842c;
                span{
                    margin-top:30rem / @rootFontSize;
                    display: block;
                }
                .payed{
                    color: slateblue;
                }
            }
        }
        .empty{
            position:absolute;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 40%;
            text-align: center;
            img{
                width: 100%;
                height: 100%;
            }
            span{

                color: #999;
            }
        }
        .cha{
            display: flex;
            justify-content: space-between;
            height: 80rem / @rootFontSize;
            align-items: center;
            div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                input{
                    margin-left: 10rem / @rootFontSize;
                }
            }
        }
	}
</style>