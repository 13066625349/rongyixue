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
			<span class="tip">默认密码123456，请及时修改密码（如已修改请忽略）</span>
			<div class="reg" >
				<button @click="login()">登陆</button>
			</div>
			<span class="tip reg" @click="goReg()">
				未注册？点击注册
			</span>
		</div>
	</div>

</template>

<script>
	import request from '../../static/js/request';
	import request1 from '../../static/js/request1';
	import result from '../../static/js/result1';
	export default {
		data() {
			return {
				userPhone:'',
				password:'',
				userId:0,
				token:'',
			}
		},
		mounted() {

		},
		created() {
			// console.log('标题',this.$route.meta.title)
			// console.log('进到登陆');
			// console.log('用户手机号--------',localStorage['phone'])

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
					phone:this.userPhone,
					password:this.password
				}
				let loginInfo = await request('/api/base/info/login',
						'post', params, 'application/x-www-form-urlencoded')
				// loading.hide()
				let res = result(loginInfo)
				console.log('失败信息',loginInfo)
				if(loginInfo.code==500){
					weui.alert(loginInfo.msg)
				}
				// loading.hide()
				if(!res) return;
				console.log('登陆成功信息',loginInfo)
				this.$store.commit('setToken', loginInfo.msg);
				this.$store.commit('setIsLogin', true);
				console.log('token值',this.$store.state.token);
				this.getInfo(loginInfo.msg)
				this.getUserInfo();
			},
			async getInfo(token){
				let params = {
					phone:this.userPhone,
					access_token: token
				}
				let headers = {
					contentType:'application/x-www-form-urlencoded',
					//token:this.$store.state.token

				}
				let myInfo = await request('/api/token/base/info/select',
						'post', params, 'application/x-www-form-urlencoded')
				// loading.hide()
				let res = result(myInfo)
				console.log('myInfo',myInfo)
				if(!res) return;
				console.log(res)
				this.userId = res.id;
				if(res.baseStudent.length>0&&res.baseStudent[0].id){
					localStorage['isHasStudent'] = true;
				}else{
					localStorage['isHasStudent'] = false;
				}
			},
			async getUserInfo(){
				let that = this;
				let params  = {
					//access_token:this.$store.state.token
				}
				let getUserInfo = await request('/api/token/base/info/getUser?access_token='+this.$store.state.token,
						'get',params,'application/x-www-form-urlencoded')
				// loading.hide()
				let info = result(getUserInfo)
				console.log('获取电话号失败信息',getUserInfo)
				// loading.hide()
				if(getUserInfo.code == 500){
					this.$store.commit('setPhone', '');
					localStorage['isHasStudent'] = false;
				}
				if(!info) return;
				console.log('获取电话号成功信息',getUserInfo)
				this.$store.commit('setPhone', getUserInfo.msg);
				if(!this.$route.query.isMyInfo){
					if(localStorage['isHasStudent']=='true'){
						this.$router.go(-1)
					}else{
						weui.confirm('请先添加宝宝信息', function(){
							that.$router.push('/loginNext?userIds='+that.userId)
						}, function(){
							weui.alert('已取消')
						}, {
							title: '是否添加'
						});

					}
				}else{
					this.$router.go(-1)
				}
			},
			goReg(){
				this.$router.push('/reg')
			}
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
		/*position: relative;
		top: 0;
		left: 0;*/
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
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
				font-size: 26rem / @rootFontSize!important;
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