<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
		<div class="userInfo">
			<span>
				手机号
			</span>
			<div class="userPhone">
				<img src="../img/phone.png" alt="">
				<input  type="number" placeholder="请输入手机号" v-model="userPhone">
			</div>
			<span class="none">
				旧密码
			</span>
			<div class="password">
				<img src="../img/password.png" alt="">
				<input type="text" placeholder="请输入旧密码" v-model="oldPassword">
			</div>
			<span class="none">
				新密码
			</span>
			<div class="password">
				<img src="../img/password.png" alt="">
				<input type="text" placeholder="请输入新密码" v-model="newPassword">
			</div>
			<div class="reg" >
				<button @click="edit()">确认修改</button>
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
				oldPassword:'',
				newPassword:'',
				token:'',
			}
		},
		mounted() {

		},
		created() {

		},
		methods: {
			 edit(){
			 	let _this = this;
				if(_this.userPhone==''){
					weui.alert("请输入手机号！");
				}
				if(_this.oldPassword==''){
					weui.alert("请输入旧密码！");
				}
				if(_this.newPassword==''){
					weui.alert("请输入新密码！");
				}
				weui.dialog({
					title: '确认修改密码吗',
					content: '将密码修改为'+_this.newPassword,
					className: 'custom-classname',
					buttons: [{
						label: '取消',
						type: 'default',
						onClick: function () {
							weui.toast('已取消修改', 2000);
						}
					}, {
						label: '确定',
						type: 'primary',
						onClick: async  function () {
							let params = {
								access_token:_this.$store.state.token,
								phone:_this.userPhone,
								newPassword:_this.newPassword,
								oldPassword:_this.oldPassword
							}
							/*let headers = {
								contentType:'application/x-www-form-urlencoded',
								//token:_this.$store.state.token

							};*/
							let loading = weui.loading('loading', {
								className: 'custom-classname'
							});
							let edit = await request('/api/token/base/info/editPassWord',
									'post', params, 'application/x-www-form-urlencoded')
							let res = result(edit)
							loading.hide()
							if(!res) return;
							console.log('修改密码结果',edit)
							weui.toast('修改成功', 2000);
							_this.$router.go(-1)
						}
					}]
				});

			},

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
		position: relative;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: orange;
		//background: url("./img/regBg.png") no-repeat;
		background-size: cover;
		input::-webkit-input-placeholder {
			color: #999;
		}
		.none{
			margin-top: 0!important;
		}
		.userInfo{
			padding-bottom: 60rem/ @rootFontSize;
			width: 90%;
			height: auto;
			/*position:absolute;
			top:50%;
			left:50%;
			transform: translate(-50%, -50%);*/
			border-radius: 20px;
			background: #fff;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			span{
				margin-top: 10rem / @rootFontSize;
				width: 100%;
				height: 60rem / @rootFontSize;
				line-height: 60rem / @rootFontSize;
				padding-left: 100rem / @rootFontSize;
				box-sizing: border-box;
			}
			span.tip{
				.font-dpr(10px);
				color: #959595;
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


		}

	}
</style>