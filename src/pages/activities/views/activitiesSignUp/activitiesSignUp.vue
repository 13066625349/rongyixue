<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
		<div class="userInfo">
			<span class="marL">参赛信息</span>
			<div class="info">
				<div class="userName">
					<span>家长姓名</span>
					<input type="text" placeholder="请输入家长姓名" v-model="userName">
				</div>
				<div class="xian"></div>
				<div class="userPhone">
					<span>手机号</span>
					<input  type="number" placeholder="请输入手机号" v-model="userPhone">
				</div>
				<div class="xian"></div>
				<div class="childName">
					<span>学生姓名</span>
					<input type="text" placeholder="请输入学生姓名" v-model="childName">
				</div>
				<div class="xian"></div>
				<div class="kindergartenName">
					<span>幼儿园</span>
					<span class="spanStyle" @click="pickerSchool()" v-show="kindergartenName==''">请选择幼儿园</span>
					<span class="spanStyle"  v-show="kindergartenName!=''" @click="pickerSchool()">{{kindergartenName}}</span>
				</div>
				<div class="xian"></div>
				<div class="classes">
					<span>班级</span>
					<!--<input type="text" placeholder="请输入班级" v-model="classes" @click="">-->
					<span class="spanStyle"  @click="pickerClass()" v-show="classes==''">请选择班级</span>
					<span class="spanStyle" v-show="classes!=''" @click="pickerClass()">{{classes}}</span>
				</div>
				<div class="xian"></div>
				<div>
					<span>参赛视频</span>
					<div class="wrap">
						<div type="primary" class="wrapper" style="color: #fff">
							<label class="btn" for="fileUpload">上传参赛视频</label>
						</div>
						<input type="file" accept="video/*" id="fileUpload" style="position:absolute; clip:rect(0 0 0 0);"  @change="uploadVideo($event)">
					</div>

				</div>
				<img src="../img/caozuo.png" alt="">
			</div>
		</div>

		<div class="signUp" >
			<button @click="signUp()">上传</button>
		</div>
	</div>

</template>

<script>
	import request from '../../../../static/js/request';
	import result from '../../../../static/js/result';
	import getParam from '../../../../static/js/getParam';
	export default {
		data() {
			return {
				userName:'',//名字
				userPhone:'',//手机号
				childName:'',//宝宝名字
				kindergartenName:'',//幼儿园名字
				kindergartenId:0,//幼儿园ID
				classes:'',//班级名称
				baseClassID:0,//班级ID
				classesInfo:[],//班级信息数组
				kindergartenInfo:[],//幼儿园信息数组
				isChange:false,
				isShow:false,
				priceNo:0,
				payStatus:false,
				spuId :0,
				timer :"",
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
			}
		},
		created() {

			this.getKindergarten();

		},
		methods: {
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

			/**
			 * 上传信息
			 * */
			async signUp(){
					alert('上传成功')
					this.$router.go(-1);

			},


		},
		/*watch:{
			showHeight() {
				if(this.docmHeight > this.showHeight){
					this.topShow=true
				}else{
					this.topShow=false
				}
			}
		}*/
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";
	.main {
		z-index: 99;
		overflow-y: scroll;
		height: 100%;
		width: 100%;
		background: #f3f3f3;
		input::-webkit-input-placeholder {
			color: #999;
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
						width: 20%;
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
					input{
						width: 80%;
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
		.signUp{
			text-align: center;
			width: 100%%;
			height: 80rem / @rootFontSize;
			button{
				margin-top: 10rem / @rootFontSize;
				margin-bottom:  10rem / @rootFontSize;
				width: 80%;
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
			width: 80%!important;
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

	}
</style>