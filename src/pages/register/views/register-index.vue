<template>
	<div class="main">
		<!--此页为扫码支付页-->
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
		<div :class="topShow?'userInfo topShow1':'userInfo'">
			<div class="userName">
				<img src="./img/username.png" alt="">
				<input type="text" placeholder="请输入姓名" v-model="userName">
			</div>
			<div class="userPhone">
				<img src="./img/phone.png" alt="">
				<input  type="number" placeholder="请输入手机号" v-model="userPhone">
				<button class="verificationBtn" @click="yzm" :disabled="isClick">{{yzmText}}</button>
			</div>
			<div class="phoneCode">
				<img src="./img/phoneCode.png" alt="">
				<input type="text" placeholder="请输入短信验证码" v-model="verifyCode">
			</div>
			<div class="childName">
				<img src="./img/babyname.png" alt="">
				<input type="text" placeholder="请输入宝宝姓名" v-model="childName">
			</div>
			<div class="classes">
				<img src="./img/classes.png" alt="">
				<!--<input type="text" placeholder="请输入班级" v-model="classes" @click="">-->
				<span class="spanStyle" style="background: #f8f8f8" @click="picker()" v-show="classes==''">请选择班级</span>
				<span class="spanStyle" style="background: #f8f8f8" v-show="classes!=''" @click="picker()">{{classes}}</span>
			</div>
			<div class="kindergartenName">
				<img src="./img/schoolname.png" alt="">
				<input class="colorStyle" type="text"  :disabled="true"  v-model="kindergartenName">
				<!--<span>{{kindergartenName}}</span>-->
			</div>
			<div class="productName">
				<img src="./img/product.png" alt="">
				<input class="colorStyle" type="text" :disabled="true"  v-model="productName">
			</div>
			<div class="price">
				<img src="./img/price2.png" alt="">
				<!--<input class="colorStyle" type="text" :disabled="true"  v-model="price">-->
				<span class="spanStyle">{{price}}元</span>
			</div>
			<div class="reg" >
				<button @click="reg()">支付</button>
			</div>

		</div>
		<div :class={mask:isShow} >
			<span :class={show:isShow} style="display: none">支付结束请点左上角退出</span>
		</div>

	</div>

</template>

<script>
	import request from '../../../static/js/request';
	import request1 from '../../../static/js/request1';
	import result from '../../../static/js/result';
	import getParam from '../../../static/js/getParam';
	import wxInfo from '../../../static/js/wxPublicInfo';
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				userName:'',//名字
				userPhone:'',//手机号
				verifyCode:"",//验证码
				childName:'',//宝宝名字
				kindergartenName:'',//幼儿园名字
				classes:'',//班级
				kindergartenId:0,//幼儿园ID568
				baseClassID:0,//班级ID
				classesInfo:[],//班级信息数组
				productName:'',//产品名
				yzmText:'发送验证码',//验证码显示，点击发送后，显示读秒倒数，当为0s时显示重发验证码
				isClick:false,//发送验证码是否能点击，
                price:0,//产品价格
				isShow:sessionStorage['isShow']?sessionStorage['isShow']:false,//是否显示提示，如果在微信浏览器打开网页提示请用外部浏览器打开，当前支付方式为H5支付，暂不能再微信内支付
				priceNo:0,//
				payStatus:false,//支付状态
				spuId :0,//
				docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
				showHeight: document.documentElement.clientHeight,   //实时屏幕高度
				topShow:false
			}
		},
		mounted() {
			window.onresize = ()=>{
				return(()=>{
					this.showHeight = document.body.clientHeight;
				})()
			};
			if (window.history && window.history.pushState) {
				// 往历史记录里面添加一条新的当前页面的url
				history.pushState(null, null, document.URL);
				// 给 popstate 绑定一个方法 监听页面刷新
				window.addEventListener('popstate', this.goBack, false);//false阻止默认事件
			}

		},
		created() {
			//判断是否是微信浏览器打开网页
			/*let ua = navigator.userAgent.toLowerCase();
			let isWeixin = ua.indexOf('micromessenger') != -1;
			if (isWeixin) {
				this.isShow = true;
			}else{
				this.isShow = false;

			}*/
			/*if(this.payStatus){
				this.$router.push('/paySuccess')
			}*/
			// 判断微信版本是否在5.0以上
			// window.navigator.userAgent 属性包含了浏览器类型，版本，操作系统类型，浏览器引擎等信息
			/*var ua = window.navigator.userAgent.toLowerCase()
			// 通过正则表达式匹配 ua 中是否含有 MicroMessenger 字符串
			if (ua.match(/MicroMessenger/i) != 'micromessenger') {
				return false
			}*/
			//this.isShow = true;
			//localStorage['goodsSkuPriceId'] = getParam('goodsSkuPriceId');
			/*测试环境*/
			let REDIRECT_URI = encodeURIComponent(this.$host+'/register.html?goodsSkuPriceId='+getParam('goodsSkuPriceId'))
			/*正式环境*/
			//let REDIRECT_URI = encodeURIComponent(this.$host+'?goodsSkuPriceId='+getParam('goodsSkuPriceId'))
			if(!getParam('code')){
				location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxInfo.wxAppId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`

			}
			this.getInfo();
			//this.getPay()
		},
		methods: {
			/**
			 * 获取信息
			 * */
			async getInfo(){
				let getInfo = await request('/api/goods/price/getPrice?id='+getParam('goodsSkuPriceId'),
						'get');
				// loading.hide()
				let info = result(getInfo);
				// loading.hide()
				if(!info) return;
				console.log('返回结果',getInfo);
				if(getInfo.data){
					this.kindergartenName = getInfo.data.baseKindergarten.kindergartenName;
					this.productName = getInfo.data.goodsSpu.goodsName;
					this.price = getInfo.data.price;
					this.priceNo = getInfo.data.priceNo;
					this.spuId = getInfo.data.skuId;
					this.getClass();
					//this.getKindergartenId();
				}
			},
			/**
			* 获取班级信息
			* */
			async getClass(){
				let params = {
					kindergartenId:this.priceNo
				}
				console.log('priceNo',this.priceNo);
				let getClassInfo = await request('/api/base/class/list',
						'post', params, 'application/x-www-form-urlencoded');
						// loading.hide()
				let info = result(getClassInfo);
				// loading.hide()
				if(!info) return;
				console.log(info);
				if(info){
					for(let item of info){
						//console.log(item)
						let items = {};
						items.label = item.className;
						items.id = item.id;
						items.classLevel = item.classLevel;
						items.studentsNumber = item.studentsNumber;
						this.classesInfo.push(items)
					}
				}


				//console.log(this.classesInfo)

			},

			/**
			* 注册信息
			* */
			async reg(){

				if(this.userName==''){
					weui.alert("请输入姓名！");
				}
				if(this.userPhone==''){
					weui.alert("请输入手机号！");
				}
				if(this.verifyCode==''){
					weui.alert("请输入验证码！");
				}
				if(this.childName==''){
					weui.alert("请输入宝宝名字！");
				}

				let params = {
                    name:this.userName,
                    phone:this.userPhone,
					verifyCode:this.verifyCode,
					kindergartenId:this.priceNo,
					nickName :this.childName,
					baseClassID:this.baseClassID,
				}
				console.log('注册信息',params);
				let regInfo = await request('/api/base/info/add',
						'post', params, 'application/x-www-form-urlencoded');
				// loading.hide()
				let res = result(regInfo);
				// loading.hide()
				if(!res) return;
				console.log('注册成功信息',regInfo);
				if(regInfo){
                    this.yzmText = '已发送';
                    this.isClick = true;
					this.$store.commit('setMemberID', regInfo.data);
					this.regToPay(regInfo.data);
				}
			},
			/**
			 * 注册成功跳转到统一下单获取订单信息
			* */
			async regToPay(memberID){
				//alert('进统一下单')
				let params = {
					attach:'',
					orderType:1,
					body:this.productName,
					total_fee:Number(this.price* 100).toFixed(),
					code:getParam('code'),
					memberID:memberID,
					spuId:this.spuId,
					kindergartenId:this.priceNo,
					baseClassId:this.baseClassID
				}
				let payInfo = await request('/api/pay/wxPay/webPay',
						'post', params, 'application/x-www-form-urlencoded');
				// loading.hide()
				let res = result(payInfo);
				console.log('统一下单支付信息',payInfo)
				let info = JSON.parse(payInfo.data)
				console.log(info)
                this.$nextTick(()=>{
                    this.toPay(info.appId,info.timeStamp,info.nonceStr,info.signType,info.paySign,info.package,this.isShow)
                })

			},
			/**
			 *  拉起支付
			 * */
			toPay(appId,timeStamp,nonceStr,signType,paySign,payId){
				//alert('调用支付')

				console.log(appId,timeStamp,nonceStr,signType,paySign,payId)
				/*let payInfo = {
					appId : appId,
					timeStamp : timeStamp,
					nonceStr : nonceStr,
					signType : signType,
					paySign : paySign,
					payId : payId
				};*/
				function onBridgeReady(){
					let that = this;
					WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								"appId": appId,   //公众号名称，由商户传入
								"timeStamp": timeStamp,     //时间戳，自1970年以来的秒数
								"nonceStr": nonceStr, //随机串
								"package":payId,  // 统一下单接口返回的prepay_id 参数值
								"signType":signType,     //微信签名方式：
								"paySign": paySign //微信签名
							},
							function(res){
								//localStorage['isShow'] = true;
								if(res.err_msg == "get_brand_wcpay_request:ok" ){
									window.location.href = that.$host+'/paySuccess.html?status=true'
								}else{
									window.location.href = that.$host+'/paySuccess.html';
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

			/**
			 * 获取手机验证码
			 * */
			async yzm(){
				console.log('发送验证码');
                if(this.userPhone == ''){
                    weui.alert("请输入手机号！");
                }
				let params = {
					str:this.userPhone
				};
				let getYzm = await request('/api/base/sms/sendSms',
						'post', params, 'application/x-www-form-urlencoded');
				// loading.hide()
				let yzm = result(getYzm);
				// loading.hide()
				if(!yzm) return;
				console.log('获取验证码',yzm);
				let yzmTime = 60;
				setInterval(()=>{
					if(yzmTime > 0 ){
						yzmTime--;
						this.yzmText = '已发送';
                        this.isClick = true;
					}else if(yzmTime==0){
						this.yzmText = '重发验证码';
						this.isClick = false;
					}
				},1000)
			},
			/**
			 * 选择班级
			 * */
			picker(){
				let _this = this;
				if(this.classesInfo){
					weui.picker(_this.classesInfo, {
						className: 'custom-classname',
						container: 'body',
						defaultValue: [],
						onChange: function (result) {
							console.log(result)
						},
						onConfirm: function (result) {
							console.log(result[0].label);
							_this.classes = result[0].label;
							_this.baseClassID = result[0].id;
						},
						id: 'singleLinePicker'
					});
				}

			},
			goBack(){
				history.pushState(null, null, document.URL);
			}
		},
		destroyed(){
			window.removeEventListener('popstate', this.goBack, false);//false阻止默认事件
			sessionStorage.setItem('isSign','1')

		},
		watch: {

			showHeight() {
				if(this.docmHeight > this.showHeight){
					this.topShow=true
				}else{
					this.topShow=false
				}
			}

		}
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";
	.main {
		z-index: 99;
		width: 100%;
		overflow-y: scroll;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: url("./img/regBg.png") no-repeat;
		background-size: cover;
		input::-webkit-input-placeholder {
			color: #999;
		}

		.userInfo{
			width: 90%;
			height: auto;
			border-radius: 20px;
			background: #fff;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding: 30rem / @rootFontSize 0;

			.userName{
				margin-top: 40rem / @rootFontSize;

			}
			div{
				width: 90%;
				height: 90rem / @rootFontSize;
				margin-bottom: 20rem / @rootFontSize;
				position: relative;
				input{
					color: #999;
				}
				input.colorStyle{
					//color: #000;
					background: #fff;
				}
				img{
					position: absolute;
					left: 25rem / @rootFontSize;
					top: 25rem / @rootFontSize;
					width: 50rem / @rootFontSize;
					height: 50rem / @rootFontSize;
				}
				input{
					width: 100%;
					height: 100%;
					background: #f8f8f8;
					border-radius: 20px;
					border: none;
					padding-left: 100rem / @rootFontSize;
					box-sizing: border-box;
					.font-dpr(14px);
				}
				button{
					margin-top: 30rem / @rootFontSize;
					width: 100%;
					height: 100%;
					border-radius: 20px;
					border: none;
					background: #ff6100;
					color: #fff;
					box-sizing: border-box;
					text-align: center;
					line-height: 50%;
					.font-dpr(16px);
				}
			}
			.userPhone{
				position: relative;
				.verificationBtn{
					.font-dpr(12px);
					margin: 0;
                    color:#999;
					background: #f8f8f8;
					position: absolute;
					right: 0;
					top: 0;
					width: 35%;
					height: 100%;
				}
			}

		}
		.spanStyle{
			width: 100%;
			height: 100%;
			display: block;
			padding-left: 100rem / @rootFontSize;
			line-height: 90rem / @rootFontSize;
			color:#999;
			border-radius: 20px;
			border: none;
			padding-left: 100rem / @rootFontSize;
			box-sizing: border-box;
			.font-dpr(14px);
		}
		.mask{
			height: 100%;
			width: 100%;
			position:fixed;
			top: 0;right: 0;left: 0;bottom: 0;
			background:rgba(0,0,0,0.3);
			z-index: 100;
			display: flex;
			justify-content: center;
			align-items: center;

			.show{
				display: block!important;
				width: 50%;
				height:60rem / @rootFontSize;
				position:absolute;
				top:50%;
				left:50%;
				transform: translate(-50%, -50%);
				color: #fff;
				text-align: center;
				line-height: 60rem / @rootFontSize;
				.font-dpr(20px);
			}
			/*.hide{
				display: none!important;
			}*/
			img{
				width: 80%;
				height: 55%;
				z-index: 111;
			}
		}
		.topShow1{
			margin-top: 300rem / @rootFontSize;
		}
	}
</style>