<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
		<div class="userInfo">
			<span>
				手机号
			</span>
			<div class="userPhone">
				<img src="./img/phone.png" alt="">

				<input  type="number" placeholder="请输入手机号" v-model="userPhone">
			</div>
			<span class="none">
				密码
			</span>

			<div class="password">

				<img src="./img/password.png" alt="">
				<input type="text" placeholder="请输入密码" v-model="password">
			</div>
			<div class="reg" >
				<button @click="login()">登陆</button>
			</div>

		</div>
	</div>

</template>

<script>
	import request from '../../../../static/js/request';
    import request1 from '../../../../static/js/request1';
	import result from '../../../../static/js/result1';
	export default {
		data() {
			return {
				userPhone:'',
				password:'',
				token:'',
			}
		},
		mounted() {

		},
		created() {
			// console.log('标题',this.$route.meta.title)
			// console.log('进到登陆');
			// console.log('用户手机号--------',localStorage['phone'])
			//this.getUserInfo();

		},
		methods: {
			async login(){
				if(this.userPhone==''){
					weui.alert("请输入手机号！");
				}
				if(this.password==''){
					weui.alert("请输入密码！");
				}

				let params = {
					expertPhone:this.userPhone,
					expertPwd:this.password
				}
				let loginInfo = await request('/api/base/expert/login',
						'post', params, 'application/x-www-form-urlencoded')
				// loading.hide()
				let res = result(loginInfo)
				if(loginInfo.code==500){
					weui.alert(loginInfo.msg)
				}

				if(!res) return;
				console.log('登陆成功信息',loginInfo)
				this.$store.commit('setExpertToken', loginInfo.msg);
				this.$store.commit('setExpertIsLogin', true);
				console.log('token值',this.$store.state.token);
				weui.toast('登录成功')
				this.$router.go(-1);
				/*this.getUserInfo();*/
			},
			/*async getUserInfo(){
				let params  = {
					//access_token:this.$store.state.token
				}

				/!*let headers = {
					contentType:'application/x-www-form-urlencoded',
					//token:this.$store.state.token

				}*!/
				let getUserInfo = await request('/api/token/base/info/getUser?access_token='+this.$store.state.token,
						'get',params,'application/x-www-form-urlencoded')
				// loading.hide()
				let info = result(getUserInfo)
				console.log('获取电话号失败信息',getUserInfo)
				// loading.hide()
				if(getUserInfo.code == 500){
					this.$store.commit('setPhone', '');
                }
				if(!info) return;
				console.log('获取电话号成功信息',getUserInfo)
				this.$store.commit('setPhone', getUserInfo.msg);
				this.$router.go(-1)
			},*/

		},
		watch: {



		}
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";
	.main {
		z-index: 99;
		overflow-y: scroll;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/*position: relative;
		top: 0;
		left: 0;*/
		//background: orange;
		background: url("./img/login2.jpg") no-repeat;
		background-size: cover;
		input::-webkit-input-placeholder {
			color: #999;
		}
		.none{
			margin-top: 0!important;
		}
		.userInfo{
			background-color:rgba(102,102,102,0.3);
			width: 90%;
			height: auto;
			/*position:absolute;
			top:50%;
			left:50%;
			transform: translate(-50%, -50%);*/
			border-radius: 20px;
			//background: #fff;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding: 40rem / @rootFontSize 0;
			span{
				color: #fff;
				.font-dpr(16px);
				margin-top: 10rem / @rootFontSize;
				width: 100%;
				height: 60rem / @rootFontSize;
				line-height: 60rem / @rootFontSize;
				padding-left: 100rem / @rootFontSize;
				box-sizing: border-box;
			}
			span.tip{
				.font-dpr(10px);
				color: #666;
				margin-top: 0;
				margin-bottom: 0;
				height: auto;
				line-height: 12px;
				padding: 0;
				width: 90%;

			}
			span.tip.reg{
				color: #007aff;
				text-align: right;
				//margin-top: 10rem / @rootFontSize;
			}
			div{
				width: 90%;
				height: 80rem / @rootFontSize;
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
					top: 15rem / @rootFontSize;
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
					margin-top: 10rem / @rootFontSize;
					width: 100%;
					height: 100%;
					border-radius: 20px;
					border: none;
					background: #ff6100;
					//background: #007aff;
					color: #fff;
					box-sizing: border-box;
					text-align: center;
					line-height: 50%;
					.font-dpr(16px);
				}
			}


		}

	}
</style>