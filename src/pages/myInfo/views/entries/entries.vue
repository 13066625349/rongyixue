
<template>
	<div class="main">
		<div class="weui-search-bar" id="searchBar" @click="search()">
			<form class="weui-search-bar__form" id="search">
				<div class="weui-search-bar__box">
					<i class="weui-icon-search"></i>
					<input type="search" class="weui-search-bar__input" placeholder="搜索" required="">
					<a href="javascript:" class="weui-icon-clear"></a>
				</div>
				<label class="weui-search-bar__label"  :style="{'line-height': height}">
					<i class="weui-icon-search"></i>
					<span>搜索</span>
				</label>
			</form>
			<a href="javascript:" class="weui-search-bar__cancel-btn">取消</a>
		</div>
		<div class="main1">
			<div v-wechat-title="$route.meta.title"></div>
			<div class="wrap">
				<div class="typeTitle">
					<img src="../img/remai.png" alt="">
					<span>近期活动</span>
				</div>
				<div class="product-wrap"  v-for="(item,index) in memberList" :key="index">
					<div class="product-item" @click="goDetail('/entries/entriesDetail?activityEndTime='+item.activityMatch.activityEndTime+'&activityId='+item.activityId+'&kindergartenId='+$route.query.kindergartenId+'&isOne=true'+'&studentId='+$route.query.studentId,item.activityId,item.isPay,item.activityPrice,item.activityMatch.theme,index)">
						<!--<div class="product-item" @click="goDetail('/activitiesDetail?id='+item.activityId)">-->
						<div class="productTitle">{{item.activityMatch.theme}}</div>
						<!--<div class="productTitle">{{item.activityMatch.activityStartTime}}&#45;&#45;{{item.activityMatch.activityEndTime}}</div>-->

						<div class="productTitle">创建时间:{{item.createTime}}</div>
						<div class="productPrice" v-if="item.activityPrice">价格:￥{{item.activityPrice}}</div>
						<div class="detail">
							<span  @click.stop="goPage('/activitiesDetail?id='+item.activityId)">查看活动介绍</span>
						</div>
					</div>

				</div>
			</div>
		</div>
		<div class="back" >
			<button @click="goBack()">返回</button>
		</div>

	</div>
</template>
<script>
	import request from '../../../../static/js/request'
	import result from '../../../../static/js/result'
	import getParam from '../../../../static/js/getParam'
	import wxInfo from '../../../../static/js/wxPublicInfo';
	import axios from 'axios'
	export default {
		data() {
			return {
				height:0,
				memberList:[],
				workInfo:[]
			}
		},
		mounted() {
			this.height = document.getElementById('search').offsetHeight-2+'px';
			/*if (window.history && window.history.pushState) {
				// 往历史记录里面添加一条新的当前页面的url
				history.pushState(null, null, document.URL);
				// 给 popstate 绑定一个方法 监听页面刷新
				window.addEventListener('popstate', this.goBack1, false);//false阻止默认事件
			}*/
		},
		created() {
			//this.search();
			let REDIRECT_URI = encodeURIComponent(this.$host+'/myInfo.html#/entries?kindergartenId='+this.$route.query.kindergartenId+'&memberID='+this.$route.query.memberID+'&baseClassID='+this.$route.query.baseClassID+'&classLevel='+this.$route.query.classLevel+'&studentId='+this.$route.query.studentId)
			if(!getParam('code')){
				location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxInfo.wxAppId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
			}
			this.getList();
		},
		methods: {

			search(){
				weui.searchBar('#searchBar');
			},
			goPage(url){
				this.$router.push(url)
			},
			async getList(){
				console.log('token',this.$store.state.token)
				console.log(this.$route.query.classLevel)
				let params = {
					kindergartenId:this.$route.query.kindergartenId,
					classLevel:this.$route.query.classLevel,
					access_token:this.$store.state.token
				};
				let listInfo = await request('/api/token/activity/kin/list',
						'post', params,'application/x-www-form-urlencoded');
				// loading.hide()
				let res = result(listInfo);
				// loading.hide()
				if(!res) return;
				console.log(res)
				this.memberList = res;
				//this.endTime = res.activityMatch.activityEndTime
			},
			async goDetail(url,activityId,isPay,price,theme,index){
				this.workInfo = [];
				let params = {
					activityId:activityId,
					studentKindergartenId:this.$route.query.kindergartenId,
					access_token:this.$store.state.token
				};
				let listInfo = await request('/api/token/activity/member/list',
						'post', params,'application/x-www-form-urlencoded');
				// loading.hide()
				let res = result(listInfo);
				// loading.hide()
				if(!res) return;
				console.log(res);
				for(let item of res){
					if(item.studentId==this.$route.query.studentId){
						this.workInfo.push(item)
					}
				}
				console.log(this.workInfo)
				let that = this;
				console.log(activityId,isPay,price,theme,index)

				if(isPay==2){
					console.log('付费')
					console.log('参赛信息',this.workInfo)
					if(this.workInfo.length==0){
						weui.alert('您暂未参加本次比赛')
					}else {
						if(this.workInfo[0].isVisible==1){

							weui.confirm('当前活动幼儿园为付费幼儿园,需付费后才可进行观看作品排名等', function(){
								that.toPay(activityId,price,theme,index,that.workInfo[0].activityMember,that.workInfo[0].id);
							}, function(){
								console.log('no')
							}, {
								title: '是否进行付费'
							});
						}else {
							console.log('付郭费')
							this.$router.push(url)
						}
					}

				}else {
					console.log('不付费')
					this.$router.push(url)
				}
			},

			async toPay(activityId,price,theme,index,activityMember,id){
				let params = {
					attach:'',
					body:theme,
					activityMatchId:activityId,
					total_fee:Number(price* 100).toFixed(),//Number(price)*100,
					code:getParam('code'),
					orderType:2,//1为产品订单，2为活动订单
					memberID:this.$route.query.memberID,
					studentId:this.$route.query.studentId,
					kindergartenId:this.$route.query.kindergartenId,
					baseClassId:this.$route.query.baseClassID
				}

				let payInfo = await request('/api/pay/wxPay/webPay',
						'post', params, 'application/x-www-form-urlencoded');
				// loading.hide()
				let res = result(payInfo);
				console.log('统一下单支付信息',payInfo)
				let info = JSON.parse(payInfo.data)
				this.$nextTick(()=>{
					this.pullUpPay(info.appId,info.timeStamp,info.nonceStr,info.signType,info.paySign,info.package,index,activityId,activityMember,id)
				})

			},
			/**
			 *  拉起支付
			 * */
			pullUpPay(appId,timeStamp,nonceStr,signType,paySign,payId,index,activityId,activityMember,id){
				let that = this;
				console.log(appId,timeStamp,nonceStr,signType,paySign,payId)
				function onBridgeReady(){
					WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								"appId": appId,   //公众号名称，由商户传入
								"timeStamp": timeStamp,     //时间戳，自1970年以来的秒数
								"nonceStr": nonceStr, //随机串
								"package":payId,  // 统一下单接口返回的prepay_id 参数值
								"signType":signType,     //微信签名方式：
								"paySign": paySign //微信签名
							},
							async function(res){

								if(res.err_msg == "get_brand_wcpay_request:ok"){
									let params = {
										studentId:that.$route.query.studentId,
										id:id,
										isVisible:2,
										access_token:that.$store.state.token
									}
									let uploadInfo = await request('/api/token/activity/member/edit',
											'post', params, 'application/x-www-form-urlencoded')
									let info = result(uploadInfo)
									if(!info) return;
									weui.toast('支付成功');
									that.$nextTick(()=>{
										location.reload();
									})
								}else{
									weui.toast('支付失败');
								}
							}
					)
				}

				// 调用微信接口
				if (typeof WeixinJSBridge == "undefined"){
					if( document.addEventListener ){
						document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
					} else if (document.attachEvent){
						document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
						document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
					}
				}else{
					onBridgeReady();
				};
			},
			goBack(){
				window.history.go(-2)
			},
			/*goBack1(){
				history.pushState(null, null, document.URL);
			}*/
		}
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";
	.main {
		width: 100%;
        box-sizing: border-box;
		position: relative;
        overflow-y: scroll;
        //padding: 30rem / @rootFontSize;
		top: 0;
		left: 0;
		input::-webkit-input-placeholder {
			color: #999;
		}
		/*#searchBar{
			position: fixed;
			top: 0;
		}*/
		.main1{
			padding: 30rem / @rootFontSize;
			background: #fff;
			height: 80%;
			overflow-y: scroll;
			.wrap{
				padding:0 30rem / @rootFontSize;
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
			.typeTitle{
				//margin-top: 20rem / @rootFontSize;
				margin-bottom: 20rem / @rootFontSize;
				img{
					width: 30rem / @rootFontSize;
					height: 40rem / @rootFontSize;
				}
				span{
					.font-dpr(16px);
					font-weight: bold;
					margin-left: 10rem / @rootFontSize;
				}
			}
			.product-wrap{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				/* .one{
                     height: 183px!important;
                 }*/
				/*.left{
                    width: 48%;
                }
                .right{
                    width: 48%;
                }*/
				.product-item{
					box-shadow: 0 0 16rem/ @rootFontSize #bababa;
					padding: 30rem / @rootFontSize;
					border-radius: 8px;
					width: 100%;
					height: auto;
					margin-bottom: 30rem / @rootFontSize;
					.small{
						height: 290rem / @rootFontSize!important;
					}
					.productImg{
						width: 100%;
						height: 350rem / @rootFontSize;
						margin-bottom: 5px;

						img{
							border-radius:8px 8px 0 0 ;
							width: 100%;
							height: 100%;
						}
					}
					.productTitle{
						.font-dpr(16px);
						//margin-left: 10rem / @rootFontSize!important;
						line-height: 20px;
						margin-bottom: 5px;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2;
						overflow:hidden;
					}
					.productPrice{
						color: #ff842c;
					}
					.detail{
						width: 100%;
						display: flex;
						justify-content: flex-end;
						span{
							.font-dpr(13px);
							color: #fff;
							display: block;
							padding: 10rem / @rootFontSize;
							//background: skyblue;
							background: #ff842c;
							border-radius: 10px;
						}
					}
					.num{
						width: 100%;
						display: flex;
						justify-content: flex-end;
						span{
							color: #ff842c;
						}
					}
					.rank{
						width: 100%;
						display: flex;
						justify-content: flex-end;
						span{
							color: #ff842c;
						}
					}
				}
			}
		}
		.back{
            z-index: 80;
            position: fixed;
            left: 0;
            bottom: 40rem / @rootFontSize;
			text-align: center;
			width: 100%;
			height: 80rem / @rootFontSize;
			button{
				margin-top: 10rem / @rootFontSize;
				margin-bottom:  10rem / @rootFontSize;
				width: 80%;
                height: 80rem / @rootFontSize;
				border-radius: 30px;
				border: none;
				background: #ff842c;
				//background: skyblue;
				color: #fff;
				box-sizing: border-box;
				text-align: center;
				line-height: 50%;
				.font-dpr(16px);
			}
		}
	}
</style>