<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
		<div :class="topShow?'userInfo topShow1':'userInfo'">
			<!--<div class="userName">
				<img src="./img/username.png" alt="">
				<input type="text" placeholder="请输入姓名" v-model="userName">
			</div>-->
			<div class="userPhone">
				<img src="./img/phone.png" alt="">
				<input  type="number" placeholder="请输入手机号" v-model="userPhone">
				<button class="verificationBtn" @click="yzm" :disabled="isClick">{{yzmText}}</button>
			</div>
			<div class="phoneCode">
				<img src="./img/phoneCode.png" alt="">
				<input type="text" placeholder="请输入短信验证码" v-model="verifyCode">
			</div>
			<!--<div class="childName">
				<img src="./img/babyname.png" alt="">
				<input type="text" placeholder="请输入宝宝姓名" v-model="childName">
			</div>
			<div class="sex">
				<img src="./img/sex.png" alt="">
				<span class="spanStyle" style="background: #f8f8f8" @click="pickerSex()" v-show="sex==''">宝宝性别</span>
				<span class="spanStyle" style="background: #f8f8f8" v-show="sex!=''" @click="pickerSex()">{{sex}}</span>
			</div>
			<div class="birthday">
				<img src="./img/birthday.png" alt="">
				<span class="spanStyle" style="background: #f8f8f8" @click="pickerBirth()" v-show="birthday==''">宝宝出生日期</span>
				<span class="spanStyle" style="background: #f8f8f8" v-show="birthday!=''" @click="pickerBirth()">{{birthday}}</span>
			</div>
			<div class="address">
				<img src="./img/address.png" alt="">
				<span class="spanStyle" style="background: #f8f8f8" @click="isAddress=true"  v-show="address==''">地址</span>
				<span class="spanStyle" style="background: #f8f8f8" v-show="address!=''"  @click="isAddress=true">{{address}}</span>
				<weui-distpicker :province="message.province"
								 :city="message.city"
								 :area="message.area"
								 v-if="isAddress"
								 @confirm="onConfirm"
								 @cancel="onCancel"
								 @change="change">
				</weui-distpicker>
			</div>-->
			<div class="reg" >
				<button @click="reg()">注册</button>
			</div>
		</div>


	</div>

</template>

<script>
	import request from '../../static/js/request';
	import result from '../../static/js/result';
	import Vue from 'vue';
	Vue.component('weui-distpicker', WeuiDistpicker)
	import WeuiDistpicker from 'weui-distpicker'
	import getParam from '../../static/js/getParam';
	export default {
		components: { WeuiDistpicker },
		data() {
			return {
				userName:'',//名字
				userPhone:'',//手机号
				verifyCode:"",//验证码
				childName:'',//宝宝名字
				kindergartenName:'',//幼儿园名字
				birthday:'',//出生日期
				sex:'',//性别
				sexId:0,
				kindergartenId:0,//幼儿园ID
				classes:'',//班级名称
				baseClassID:0,//班级ID
				classesInfo:[],//班级信息数组
				kindergartenInfo:[],//幼儿园信息数组
				address:'',//地址
				yzmText:'发送验证码',
				isClick:false,
				isChange:false,
				isShow:false,
				priceNo:0,
				payStatus:false,
				spuId :0,
				timer :"",
				docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
				showHeight: document.documentElement.clientHeight,   //实时屏幕高度
				topShow:false,
				isAddress:false,
				message: {
					province: '北京市',
					city: '北京城区',
					area: '东城区'
				},

			}
		},
		mounted() {
			window.onresize = ()=>{
				return(()=>{
					this.showHeight = document.body.clientHeight;
				})()
			}
		},
		created() {

			this.getKindergarten();

		},
		methods: {
			change(data){
				console.log(data)
			},
			onConfirm(data ){
				this.message.province = data[0].label;
				this.message.city = data.length >= 2 ? data[1].label : '';
				this.message.area = data.length == 3 ? data[2].label : '';
				console.log(this.message);
				this.address = this.message.province + '-' + this.message.city + '-' + this.message.area;
				this.isAddress = false;
			},
			onCancel(){
				this.isAddress = false;
			},
			/**
			 * 获取幼儿园信息
			 * */
			async getKindergarten(){
				let params = {

				}

				let getClassInfo = await request('/api/base/kindergarten/list',
						'post', params, 'application/x-www-form-urlencoded')
				// loading.hide()
				let info = result(getClassInfo)
				// loading.hide()
				if(!info) return;
				console.log(info)
				console.log(getClassInfo)
				if(info){
					for(let item of getClassInfo.rows){
						let items = {};
						items.label = item.kindergartenName;
						items.id = item.id;
						this.kindergartenInfo.push(items)
					}
				}

			},

			/**
			 * 获取班级信息
			 * */
			async getClass(id){
				let params = {
					kindergartenId:id
				}
				let getClassInfo = await request('/api/base/class/list',
						'post', params, 'application/x-www-form-urlencoded')
				// loading.hide()
				let info = result(getClassInfo)
				// loading.hide()
				if(!info) return;
				if(info){
					for(let item of info){
						let items = {};
						items.label = item.className;
						items.id = item.id;
						items.classLevel = item.classLevel;
						items.studentsNumber = item.studentsNumber;
						this.classesInfo.push(items)
					}
				}

			},

			/**
			 * 获取手机验证码
			 * */
			async yzm(){
				console.log('发送验证码')
				if(this.userPhone == ''){
					weui.alert("请输入手机号！");
				}
				let params = {
					str:this.userPhone
				}
				let getYzm = await request('/api/base/sms/sendSms',
						'post', params, 'application/x-www-form-urlencoded')
				// loading.hide()
				let yzm = result(getYzm)
				if(getYzm.code==500){
					weui.alert('手机号有误')
				}
				// loading.hide()
				if(!yzm) return;
				this.isClick = true;
				console.log('获取验证码',yzm)
				let yzmTime = 60;
				this.timer = setInterval(()=>{
					if(yzmTime > 0 ){
						yzmTime--
						this.yzmText = '已发送';
					}else if(yzmTime==0){
						this.yzmText = '重发验证码';
						this.isClick = false;
						return;
					}
				},1000)
			},
			/**
			 * 选择幼儿园
			 * */
			pickerSchool(){
				let _this = this;
				if(_this.kindergartenInfo.length!=0){
					weui.picker(_this.kindergartenInfo, {
						className: 'custom-classname',
						container: 'body',
						defaultValue: [],
						onChange: function (result) {
							console.log(result)
							_this.kindergartenId = result[0].id;
						},
						onConfirm: function (result) {
							console.log(result);
							_this.kindergartenName = result[0].label;
							_this.kindergartenId = result[0].id;
							_this.classesInfo = [];
							_this.classes = '';
							_this.getClass(result[0].id);
						},
						id: 'singleLinePicker'
					});
				}
			},
			/**
			 * 选择班级
			 * */
			pickerClass(){
				let _this = this;
				if(!_this.kindergartenId){
					weui.alert('请先选择幼儿园')
				}
				console.log(this.classesInfo)
				if(this.classesInfo.length!=0){
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
			/**
			 * 选择性别
			 * */
			pickerSex(){
				let _this = this;

				weui.picker([
					{
						label: '男',
						value: 1
					}, {
						label: '女',
						value: 0
					}
				], {
					className: 'custom-classname',
					container: 'body',
					defaultValue: [],
					onChange: function (result) {
						console.log(result)
					},
					onConfirm: function (result) {
						console.log(result[0].label);
						_this.sex = result[0].label;
						_this.sexId = result[0].value;

					},
					id: 'singleLinePicker'
				});


			},
			/**
			 * 选择出生日期
			 * */
			pickerBirth(){
				let _this = this;
				let year = new Date().getFullYear();
				let month = new Date().getMonth()+1;
				weui.datePicker({
					start: 1990,
					end: year,
					depth:2,
					defaultValue: [year, month],
					onChange: function(result){
						console.log(result);
					},
					onConfirm: function(result){
						console.log(result);
						_this.birthday = result[0].value+'-'+result[1].value;
						console.log(_this.birthday)
					},
					id: 'datePicker'
				});


			},

			/**
			 * 注册信息
			 * */
			async reg(){

				/*if(!this.userName){
					weui.alert("请输入姓名！");
					return;
				}*/
				if(!this.userPhone){
					weui.alert("请输入手机号！");
					return;
				}
				if(!this.verifyCode){
					weui.alert("请输入验证码！");
					return;
				}
				/*if(!this.childName){
					weui.alert("请输入宝宝名字！");
					return;
				}
				if(!this.sex){
					weui.alert("请选择性别！");
					return;
				}
				if(!this.birthday){
					weui.alert("请选择出生日期！");
					return;
				}
				if(!this.address){
					weui.alert("请选择地址！");
					return;
				}*/else {
					/*注册家长*/
					let params = {
						/*address : this.address,
						birthday : this.birthday,*/
						/*name : this.userName,
						nickName: this.childName,
						sex : this.sexId,*/
						phone : this.userPhone,
						verifyCode : this.verifyCode
					}
					let regInfo = await request('/api/base/info/add',
							'post', params, 'application/x-www-form-urlencoded')
					// loading.hide()
					let res = result(regInfo)
					if(regInfo.code==500){
						weui.alert(regInfo.msg);
						return;
					}
					// loading.hide()
					if(!res) return;
					weui.toast('注册成功')
					let userIds = regInfo.data
					this.$router.push('/regNext?userPhone='+this.userPhone+'&userIds='+userIds)
					/*注册学生*/
					/*let params1 = {
						studentName:this.childName,
						studentKindergartenName:this.kindergartenName,
						studentKindergartenId:this.kindergartenId,
						studentClassName:this.classes,
						studentClassId:this.baseClassID,
						studentSex:this.sexId,
						studentBirthday:this.birthday,
						studentAddress:this.address
					}
					let addStudent = await request('api/base/info/student/add',
							'post', params1, 'application/x-www-form-urlencoded')
					// loading.hide()
					let res1 = result(addStudent);
					if(!res1) return;
					let studentId = addStudent.data
					/!*获取token*!/
					let params2 = {
						phone:this.userPhone,
						password:123456,
					}
					let login = await request('/api/base/info/login',
							'post', params2, 'application/x-www-form-urlencoded')
					// loading.hide()
					let res2 = result(login);
					let token = login.msg
					if(!res2) return;
					/!*关联学生家长*!/
					let params3 = {
						studentId:studentId,
						userIds:userIds,
						access_token: token
					}
					let relatedness = await request('/api/token/base/student/authMember/selectAll',
							'post', params3, 'application/x-www-form-urlencoded')
					// loading.hide()
					let res3 = result(relatedness);
					if(!res3) return;*/
					//this.$router.go(-1);
				}

			},


		},
		watch:{
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
		overflow-y: scroll;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;

		background: url("./img/login2.jpg") no-repeat;
		//background: orange;
		input::-webkit-input-placeholder {
			color: #999;
		}

		.userInfo{
			padding-bottom: 30rem / @rootFontSize;
			width: 90%;
			height: auto;
			padding-top: 30rem / @rootFontSize;
			border-radius: 20px;
			background: #fff;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;

			.userName{
				margin-top: 40rem / @rootFontSize;

			}
			div{
				width: 90%;
				height: 90rem / @rootFontSize;
				margin-bottom: 10rem / @rootFontSize;
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
					margin-top: 10rem / @rootFontSize;
					margin-bottom:  10rem / @rootFontSize;
					width: 100%;
					height: 100%;
					border-radius: 20px;
					border: none;
					//background: #ff6100;
					background: #ff842c;
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
		.topShow1{
			margin-top: 300rem / @rootFontSize;
		}

	}
</style>