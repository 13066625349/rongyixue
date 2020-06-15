<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
		<div class="userInfo">
			<span class="marL">参赛信息</span>
			<div class="info">
				<div class="childName">
					<span>学生姓名</span>
					<input type="text" placeholder="请输入学生姓名" v-model="childName">
				</div>
				<div class="xian"></div>
				<div class="userName">
					<span>家长姓名</span>
					<input type="text" placeholder="请输入家长姓名" v-model="userName">
				</div>
				<div class="xian"></div>
				<div class="userPhone">
					<span>家长手机号</span>
					<input @change="phoneTest(userPhone)" type="number" placeholder="请输入手机号" v-model="userPhone">
				</div>
				<div class="xian"></div>
				<div class="kindergartenName">
					<span>幼儿园</span>
					<span class="spanStyle">{{kindergartenName}}</span>
				</div>
				<div class="xian"></div>
				<div class="classes">
					<span>班级</span>
					<span class="spanStyle">{{classes}}</span>
				</div>
			</div>
		</div>

		<div class="signUp" >
			<button @click="goBack()">返回上一步</button>
			<button @click="goNext()">下一步</button>
		</div>
	</div>

</template>

<script>
	import request from '../../../../static/js/request';
	import result from '../../../../static/js/result';
	import getParam from '../../../../static/js/getParam';
	import axios from 'axios'
	export default {
		data() {
			return {
				userName:'',//名字
				userPhone:'',//手机号
				childName:'',//宝宝名字
				childNum:'',
				score:'',
				showImg:'',
				videoUrl:'',
				file:'',
				isView:false,
				isViewVideo:false,
				isShow:false,
				kindergartenName:'',//幼儿园名字
				kindergartenId:0,//幼儿园ID
				classes:'小班',//班级名称
				baseClassID:0,//班级ID
				isAdd:false,
				/*classesInfo:[],//班级信息数组
                kindergartenInfo:[],//幼儿园信息数组
                isChange:false,*/

			}
		},
		mounted() {

		},
		created() {
			let classInfo = JSON.parse(localStorage['classesInfo'])
			console.log('信息',classInfo)
			this.kindergartenName = classInfo.kindergartenName;
			this.classes = classInfo.classes;
			this.kindergartenId = classInfo.kindergartenId;
			this.baseClassID = classInfo.baseClassID;
			//this.getKindergarten();

		},
		methods: {
			phoneTest(phone){
				if(!(/^1[3456789]\d{9}$/.test(phone))){
					weui.alert("请输入正确手机号");
					this.userPhone = '';
					return false;
				}
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
				if(info){
					for(let item of info){
						let items = {};
						items.label = item.kindergartenName;
						items.id = item.id;
						this.kindergartenInfo.push(items)
					}
				}

			},
			goBack(){
				this.$router.go(-1)
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
			/*async addStudent(){
				let params1 = {
					studentName:this.childName,
					studentKindergartenName:this.kindergartenName,
					studentKindergartenId:this.kindergartenId,
					studentClassName:this.classes,
					studentClassId:this.baseClassID,
					access_token: this.$store.state.expertToken
				}
				let addStudent = await request('/api/token/base/student/add',
						'post', params1, 'application/x-www-form-urlencoded')
				// loading.hide()
				let res2 = result(addStudent);
			},*/
			/*async studentParent(){
				let params2 = {
					studentId:res2.msg,
					userIds:res1.id,
					access_token: this.$store.state.expertToken
				}
				let relatedness = await request('/api/token/base/student/authMember/selectAll',
						'post', params2, 'application/x-www-form-urlencoded')
				// loading.hide()
				let res2 = result(relatedness);
			},*/
			/**
			 * 保存信息下一步
			 * */
			async goNext(){
				if(this.childName == ''){
					weui.alert('请填写学生姓名');
					return false;
				}
				if(this.userName == ''){
					weui.alert('请填写家长姓名');
					return false;
				}
				if(this.userPhone == ''){
					weui.alert('请填写家长手机号');
					return false;
				}
				let params = {
					name:this.userName,
					phone:this.userPhone,
				}
				let regInfo = await request('/api/base/info/addUser',
						'post', params, 'application/x-www-form-urlencoded');
				// loading.hide()
				let res = result(regInfo);
				if(regInfo.code==500){
					//weui.alert(regInfo.msg)
					let params = {
						phone:this.userPhone,
						access_token: this.$store.state.expertToken
					}
					let myInfo = await request('/api/token/base/info/select',
							'post', params, 'application/x-www-form-urlencoded')
					// loading.hide()
					let res1 = result(myInfo)
					console.log('myInfo',myInfo);
					let params1 = {
						studentName:this.childName,
						studentKindergartenName:this.kindergartenName,
						studentKindergartenId:this.kindergartenId,
						studentClassName:this.classes,
						studentClassId:this.baseClassID,
						access_token: this.$store.state.expertToken
					}
					let addStudent = await request('api/base/info/student/add',
							'post', params1, 'application/x-www-form-urlencoded')
					// loading.hide()
					let res2 = result(addStudent);
					console.log('学生ID',res2,addStudent.data)
					let params2 = {
						studentId:addStudent.data,
						userIds:res1.id,
						access_token: this.$store.state.expertToken
					}
					let relatedness = await request('/api/token/base/student/authMember/selectAll',
							'post', params2, 'application/x-www-form-urlencoded')
					// loading.hide()
					let res3 = result(relatedness);
					if(!res3) return ;
					this.$router.push('/uploadNext?studentId='+addStudent.data+'&activityId='+this.$route.query.activityId+'&studentName='+this.childName+'&kindergartenId='+this.kindergartenId+'&baseClassID='+this.baseClassID+'&userName='+this.userName+'&kindergartenName='+this.kindergartenName+'&classes='+this.classes)

				}
				// loading.hide()
				if(!res) return;
				console.log('信息',regInfo);
				let params1 = {
					studentName:this.childName,
					studentKindergartenName:this.kindergartenName,
					studentKindergartenId:this.kindergartenId,
					studentClassName:this.classes,
					studentClassId:this.baseClassID,
					access_token: this.$store.state.expertToken
				}
				let addStudent = await request('api/base/info/student/add',
						'post', params1, 'application/x-www-form-urlencoded')
				// loading.hide()
				let res2 = result(addStudent);
				if(!res2) return;
				let params2 = {
					studentId:addStudent.data,
					userIds:regInfo.data,
					access_token: this.$store.state.expertToken
				}
				let relatedness = await request('/api/token/base/student/authMember/selectAll',
						'post', params2, 'application/x-www-form-urlencoded')
				// loading.hide()
				let res3 = result(relatedness);
				if(!res3) return;
				this.$router.push('/uploadNext?studentId='+addStudent.data+'&activityId='+this.$route.query.activityId+'&studentName='+this.childName+'&kindergartenId='+this.kindergartenId+'&baseClassID='+this.baseClassID+'&userName='+this.userName+'&kindergartenName='+this.kindergartenName+'&classes='+this.classes)

			},


		}
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";
	.main {
		z-index: 99;
		/*overflow-y: scroll;*/
		height: 100%;
		width: 100%;
		background: #f3f3f3;
		input::-webkit-input-placeholder {
			color: #999;
		}

		.showBigImg{
			padding: 30rem / @rootFontSize;
			background: #fff;
			display: flex;
			justify-content: flex-end;
			.font-dpr(14px);
			color: #959595;
			border-bottom: 1px solid #999;
			span{
				display: block;
				padding: 0 30rem / @rootFontSize;
				height: 100%;
			}
		}
		.userInfo{
			padding-top: 30rem / @rootFontSize;
			width: 100%;
			height: auto;
			span{
				.font-dpr(14px);
				color: #959595;
			}
			.marL{
				margin-left:20rem / @rootFontSize;
			}
			.userName{
				//margin-top: 40rem / @rootFontSize;
			}
			.info{
				padding-left: 20rem / @rootFontSize;
				box-sizing: border-box;
				background: #fff;
				div{
					span{
						line-height: 80rem / @rootFontSize;
						color: #999;
						width: 30%;
					}
					display: flex;
					width: 100%;
					height: 80rem / @rootFontSize;
					margin-bottom: 10rem / @rootFontSize;
					//border-bottom: 1px solid #999;
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
					.viewVideo{
						width: 70%;
						height: 100%;
						border: none;
						padding-left: 100rem / @rootFontSize;
						box-sizing: border-box;
						.font-dpr(14px);
						line-height: 80rem / @rootFontSize;
						color: #999;
					}
					input{
						width: 70%;
						height: 100%;
						border: none;
						padding-left: 100rem / @rootFontSize;
						box-sizing: border-box;
						.font-dpr(14px);
					}
				}
				.xian{
					width: 100%;
					height: 1px!important;
					background: #999;
				}
				img{
					width: 100%;
				}
			}

		}
		.uploadImg{
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #999;
			.font-dpr(14px);
			padding: 0 30rem / @rootFontSize;
			.up{
				width: 200rem / @rootFontSize;
				height: 200rem / @rootFontSize;
				position: relative;
				img{
					width: 100%;
					height: 100%;
				}
				form{
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					input{
						width: 100%;
						height: 100%;
						z-index: 100;
						position: absolute;
						top: 0;
						left: 0;
						opacity: 0;
					}
				}
				.show{
					display: block!important;
				}
				.delete{
					display: none;
					width: 60rem / @rootFontSize;
					height: 60rem / @rootFontSize;
					z-index: 101;
					position: absolute;
					top: 0;
					right: 0;
				}
			}

		}
		.score{
			//border-bottom: 1px solid #999;
			span{
				line-height: 80rem / @rootFontSize;
				color: #999;
				width: 30%;
				.font-dpr(14px);
				background: #fff;
				padding-left: 20rem / @rootFontSize;
			}
			display: flex;
			width: 100%;
			height: 80rem / @rootFontSize;
			margin-bottom: 10rem / @rootFontSize;
			//border-bottom: 1px solid #999;
			position: relative;
			input{
				color: #999;
			}
			input.colorStyle{
				//color: #000;
				background: #fff;
			}
			input{
				color: #999;
				width: 70%;
				height: 100%;
				border: none;
				padding-left: 100rem / @rootFontSize;
				box-sizing: border-box;
				.font-dpr(14px);
			}
		}
		.signUp{
			text-align: center;
			width: 100%;
			display: flex;
			justify-content: space-between;
			height: 80rem / @rootFontSize;
			padding:0 3%;
			box-sizing: border-box;
			button{
				margin-top: 10rem / @rootFontSize;
				margin-bottom:  10rem / @rootFontSize;
				width: 48%;
				height: 100%;
				border-radius: 30px;
				border: none;
				//background: #ff6100;
				background: skyblue;
				color: #fff;
				box-sizing: border-box;
				text-align: center;
				line-height: 50%;
				.font-dpr(16px);
			}
		}
		.spanStyle{
			width: 70% !important;
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
		input.file{
			position: relative;
			-moz-opacity:0 ;
			//filter:alpha(opacity: 0);
			opacity: 0;
			z-index: 2;
		}
		.wrap{
			display: flex;
			align-items: center;
			width: 80%;
			box-sizing: border-box;
			padding-left: 100rem / @rootFontSize;
			.wrapper{
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #31b0d5;
				border-color: #269abc;
				//margin-bottom: 0;
				font-size: 14px;
				font-weight: 400;
				cursor: pointer;
				border: 1px solid transparent;
				border-radius: 4px;

			}
		}
		.viewImg{
			z-index: 999;
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: #000;
			display: flex;
			justify-content: center;
			align-items: center;
			img{
				width: 100%;
				height: 50%;
			}
		}
		.watchVideo{
			z-index: 999;
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: #000;
			display: flex;
			justify-content: center;
			align-items: center;
			video{
				width: 100%;
				height: 50%;
			}
		}

	}
</style>