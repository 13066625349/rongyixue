<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
		<div class="top">
			<div class="topContent">
				<div class="headImg">
					<div class="quan">
						<img :src="headSculpture" alt="">
						<!--<img src="./img/head.png" alt="">-->
					</div>
				</div>
				<div class="name">
					{{userName}}
				</div>
				<div class="phoneNumber">
					<span>{{phone}}</span>
					<!--<img src="./img/edit.png" alt="" @click="editInfo()">-->
				</div>
			</div>
		</div>
		<div class="userInfo">
			<div class="userName">
				<div class="left">
					<img src="./img/username.png" alt="">
					<span>老师姓名</span>
				</div>
				<div class="right" >

					<span>{{userName}}</span>

				</div>
			</div>
			<div class="xian"></div>
			<!--<div class="password">
				<div class="left">
					<img src="./img/password.png" alt="">
					<span>密码</span>
				</div>
				<div class="right" @click="editPassword()">
					<span>点击修改密码</span>
					<img src="./img/jiantou.png" alt="">
				</div>
			</div>
			<div class="xian"></div>-->
			<div class="schoolName">
				<div class="left">
					<img src="./img/people.png" alt="">
					<span>幼儿园名称</span>
				</div>
				<div class="right">
					<span>{{kindergartenName}}</span>

				</div>
			</div>
			<div class="xian"></div>
			<div class="classes" >
				<div class="left">
					<img src="./img/classes.png" alt="">
					<span>班级</span>
				</div>
				<div class="right" >
					<span>{{classes}}</span>

				</div>
			</div>
			<div class="xian"></div>
			<div class="classes" >
				<div class="left">
					<img src="./img/classes.png" alt="">
					<span>班级人数</span>
				</div>
				<div class="right" >
					<span>{{peopleNum}}人</span>

				</div>
			</div>
			<div class="xian"></div>
		</div>
		<div class="activitiesList">
			<div class="typeTitle">
				<img src="./img/remai.png" alt="">
				<span>活动列表</span>
			</div>
			<div class="product-wrap"  v-for="(item,index) in gameList" :key="index">
				<div class="product-item" @click="goDetail('/activitiesDetail?id='+item.activityId+'&kindergartenId='+kindergartenId+'&activityId='+item.activityId+'&baseClassID='+baseClassID)">
					<div class="productTitle">{{item.activityMatch.theme}}</div>
					<!--<div class="productTitle">{{item.activityMatch.activityStartTime}}&#45;&#45;{{item.activityMatch.activityEndTime}}</div>-->
					<div class="productPrice" v-if="item.activityPrice">价格:￥{{item.activityPrice}}</div>
					<div class="productTitle">创建时间:{{item.createTime}}</div>
				</div>
			</div>
		</div>
		<div class="edit">
			<button class="btn" @click="writeOff()">注销</button>
		</div>

	</div>
</template>

<script>
	import request from '../../../static/js/request';
	import request1 from '../../../static/js/request1';//header中有token值请求
	import result from '../../../static/js/result'
	export default {
		data() {
			return {
				gameList:[],
				headSculpture:'',
				phone:'',
				isShow:false,
				userName:'',
				kindergartenName:'',
				birthday:'',//出生日期
				sex:'',//性别
				sexId:'',
				kindergartenId:0,//幼儿园ID
				classes:'',//班级名称
				baseClassID:0,//班级ID
				classesInfo:[],//班级信息数组
				kindergartenInfo:[],//幼儿园信息数组
				peopleNum:0,
                classLevel:0,
			}
		},
		mounted() {

		},
		created() {
			console.log('token值',localStorage['expertToken'])
			this.getTeacherInfo();
			//this.getInfo();
		},

		methods: {
			async getKindergarten(){
				let params = {

				}

				let getClassInfo = await request('/api/base/kindergarten/select/'+this.kindergartenId,
						'get', params, 'application/x-www-form-urlencoded')
				// loading.hide()
				let info = result(getClassInfo)
				// loading.hide()
				if(!info) return;
				console.log(info)
				this.kindergartenName = info.kindergartenName;
				this.$nextTick(()=>{
					this.getClass();
				})

			},
			async getClass(){
				let params = {
					kindergartenId:this.kindergartenId
				}
				let getClassInfo = await request('/api/base/class/list',
						'post', params, 'application/x-www-form-urlencoded')
				// loading.hide()
				let info = result(getClassInfo)
				// loading.hide()
				if(!info) return;
				console.log('班级信息',info)
				for(let item of info){
					if(item.id == this.baseClassID){
						this.classes = item.className;
						this.peopleNum = item.studentsNumber;
					}
				}
				this.$nextTick(()=>{
					let classInfo = {
						kindergartenId : this.kindergartenId,
						kindergartenName : this.kindergartenName,
						baseClassID : this.baseClassID,
						classes: this.classes,
					}
					this.$store.commit('setClassInfo', JSON.stringify(classInfo))
				})
			},
			async getList(){
				console.log('token值',this.$store.state.expertToken)
				let params = {
					kindergartenId:this.kindergartenId,
					access_token:localStorage['expertToken'],
                    classLevel:this.classLevel
				};
				let getListInfo = await request('/api/token/activity/kin/list',
						'post',params,'application/x-www-form-urlencoded')
				// loading.hide()
				let res = result(getListInfo)
				console.log(res)
				// loading.hide()
				if(!res) return;
				console.log('返回结果',getListInfo)
				this.gameList = getListInfo.data;
			},
			async getTeacherInfo(){
				let params  = {
					access_token:localStorage['expertToken']
				}

				let getTeacherInfo = await request('/api/token/base/expert/selectID',
						'post',params,'application/x-www-form-urlencoded')
				// loading.hide()
				let info = result(getTeacherInfo)
				if(getTeacherInfo.code == 500){
					this.$store.commit('setExpertToken', '');
					weui.alert('登录已过期，请重新登录')
					this.$router.push('/login')
				}
				if(!info) return;
				console.log('老师信息',info)
				this.userName = info.expertName;
				this.phone = info.expertPhone;
				this.kindergartenId = info.kindergartenId;
				this.baseClassID = info.classId;
				this.headSculpture = info.expertHeadImg;
				this.classLevel = info.baseClass.classLevel
				this.$nextTick(()=>{
					this.getKindergarten();
					this.getList();
				})
				/*this.$store.commit('setPhone', getUserInfo.msg);*/
			},
			editInfo(){
				this.$router.push('/editInfo');
			},
			/**
			 * 修改密码
			 * */
			editPassword(){
				this.$router.push('./editPassword')
			},

			/**
			 * 注销账号，退出
			 * */
			writeOff(){
				this.$store.commit('setExpertToken','')
				this.$store.commit('setExpertIsLogin',false)
				localStorage['classInfo'] = '';
				weui.toast('已退出',2000);
				this.$router.push('/login')
			},
			goDetail(url){
				this.$router.push(url);
			},

		},
		watch: {

		},
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";
	.main {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		background: #fff;
		box-sizing: border-box;
		position: relative;
		top: 0;
		left: 0;
		input::-webkit-input-placeholder {
			color: #999;
		}
		.top{
			background: url("img/myBg.png") no-repeat;
			background-size: 100%;
			//background: skyblue;
			width: 100%;
			height: 375rem / @rootFontSize;
			position: relative;

			.topContent{
				flex-wrap: wrap;
				display: flex;
				justify-content: center;
				width: 250rem  / @rootFontSize;
				height: 250rem  / @rootFontSize;
				position:absolute;
				top:50%;
				left:50%;
				transform: translate(-50%, -50%);
				.headImg{
					border-radius: 50%;
					background: #fff;
					position: relative;
					width: 150rem / @rootFontSize;
					height: 150rem / @rootFontSize;
					.quan{
						position:absolute;
						top:50%;
						left:50%;
						transform: translate(-50%, -50%);
						border-radius: 50%;
						background: #fff;
						width: 140rem / @rootFontSize;
						height: 140rem / @rootFontSize;
						.upHeadImg{
							display: block;
							width: 100%;
							height: 100%;
							border-radius: 50%;
							opacity: 0;
							z-index: 99;
							position: absolute;
							top: 0;
							left: 0;
						}
						img{
							height: 100%;
							width: 100%;
							border-radius: 50%;

						}
						span{
							width: 100%;
							height: 100%;
							display: block;
							border-radius: 50%;
							text-align: center;
							color: #ff842c;
							line-height: 140rem / @rootFontSize;
						}
					}
				}
			}
			.name{
				color: #fff;
				width: 100%;
				text-align: center;
				.font-dpr(16px);
			}
			.phoneNumber{
				display: flex;
				justify-content: center;
				padding: 0 20rem / @rootFontSize;
				box-sizing: border-box;
				align-items: center;
				width: 100%;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.15);
				border-radius: 10px;
				line-height: 14px;
				img{
					width: 36rem / @rootFontSize;
					height: 36rem / @rootFontSize;
				}
			}
		}
		.userInfo{
			background: #fff;
			.font-dpr(16px);
			.userName{
				padding: 0 20rem / @rootFontSize;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rem / @rootFontSize;
				.left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img{
						width: 32rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-right: 20rem / @rootFontSize;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;
					align-items: center;

					color: #959595;
					input{
						border: none;
						text-align: right;
						color: #959595;
					}
					img{
						width: 20rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-left: 20rem / @rootFontSize;
					}
				}

			}
			.password{
				padding: 0 20rem / @rootFontSize;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rem / @rootFontSize;
				.left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img{
						width: 32rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-right: 20rem / @rootFontSize;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #959595;
					img{
						width: 20rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-left: 20rem / @rootFontSize;
					}
				}

			}
			.babyName{
				padding: 0 20rem / @rootFontSize;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rem / @rootFontSize;
				.left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img{
						width: 32rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-right: 20rem / @rootFontSize;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #959595;
					input{
						border: none;
						text-align: right;
						color: #959595;
					}
					img{
						width: 20rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-left: 20rem / @rootFontSize;
					}
				}

			}
			.schoolName{
				padding: 0 20rem / @rootFontSize;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rem / @rootFontSize;
				.left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img{
						width: 32rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-right: 20rem / @rootFontSize;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #959595;
					img{
						width: 20rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-left: 20rem / @rootFontSize;
					}
				}

			}
			.classes{
				padding: 0 20rem / @rootFontSize;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rem / @rootFontSize;
				.left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img{
						width: 32rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-right: 20rem / @rootFontSize;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #959595;
					img{
						width: 20rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-left: 20rem / @rootFontSize;
					}
				}

			}
			.sex{
				padding: 0 20rem / @rootFontSize;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rem / @rootFontSize;
				.left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img{
						width: 32rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-right: 20rem / @rootFontSize;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #959595;
					img{
						width: 20rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-left: 20rem / @rootFontSize;
					}
				}

			}
			.birthday{
				padding: 0 20rem / @rootFontSize;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rem / @rootFontSize;
				.left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img{
						width: 32rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-right: 20rem / @rootFontSize;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #959595;
					img{
						width: 20rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-left: 20rem / @rootFontSize;
					}
				}

			}
			.regTime{
				padding: 0 20rem / @rootFontSize;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rem / @rootFontSize;
				.left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img{
						width: 32rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-right: 20rem / @rootFontSize;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #959595;
					img{
						width: 20rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-left: 20rem / @rootFontSize;
					}
				}

			}
			.address{
				padding: 0 20rem / @rootFontSize;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rem / @rootFontSize;
				.left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					img{
						width: 32rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-right: 20rem / @rootFontSize;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #959595;
					input{
						border: none;
						text-align: right;
						color: #959595;
					}
					img{
						width: 20rem / @rootFontSize;
						height: 32rem / @rootFontSize;
						margin-left: 20rem / @rootFontSize;
					}
				}

			}
			.xian{
				width: 91%;
				height: 1px;
				background: #f6f6f6;
				margin-left: 9%;
			}
		}
		.edit{
			background: #fff;
			width: 100%;
			height: 100rem / @rootFontSize;
			display: flex;
			justify-content: center;
			margin-top: 20rem / @rootFontSize;
			.btn{
				width: 80%;
				height: 100%;
				line-height: 100rem / @rootFontSize;
				background: #ff842c;
				//background: skyblue;
				border: none;
				border-radius: 20px;
				color: #fff;
			}
		}
		.activitiesList{
			padding: 30rem / @rootFontSize;
			.typeTitle{
				margin-top: 20rem / @rootFontSize;
				margin-bottom: 20rem / @rootFontSize;
				img{
					width: 30rem / @rootFontSize;
					height: 40rem / @rootFontSize;
				}
				span{
					.font-dpr(14px);
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
					border-radius: 8px;
					width: 100%;
					height: auto;
					padding: 30rem / @rootFontSize;
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
						line-height: 14px;
						margin-bottom: 5px;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2;
						overflow:hidden;
					}
					.productPrice{
						color: #ff842c;
						margin: 5px 0;
					}
				}
			}
		}

	}

</style>
