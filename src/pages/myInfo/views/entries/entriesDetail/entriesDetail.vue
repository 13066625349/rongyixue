<template>
	<div class="main">
		<div class="box">
			<div v-wechat-title="$route.meta.title"></div>
			<div v-if="isNo" class="recode-wrap" v-for="(item,index) in workInfo" :key="index">
				<div class="content"  >
					<div class="img">
						<div class="img-wrap">
							<img  @click="showBigImg(item.activityImgUrl)" :src="item.activityImgUrl" alt="">
						</div>
					</div>
					<div class="payInfo">
						<div class="payTitle">{{item.studentName}}<span>(当前排名{{rank}})</span></div>
						<div class="payClassHour"></div>
						<div>{{item.createTime}}</div>
					</div>
					<div class="payPrice">
						作品评分
						<span>{{Number(item.workUnderlineScore*0.8+item.workOnlineScore*0.2).toFixed(2)}}分</span>
					</div>
					<div class="video" @click="showVideo(item.activityVideoUrl)">
						<img src="../../img/video.png" alt="">
					</div>
				</div>
			</div>
			<div v-if="!isNo"  class="wrap">
				<div class="product-wrap"  >
					<div class="product-item" >
						<div class="comment" v-if="teachCommentTitle">
							<!--<img src="../../img/comment.png" alt="">-->
							<span>评语：</span>
							<div>{{teachCommentTitle}}</div>
						</div>
						<div class="score">
							<div class="scoreTitle">
								<img src="../../img/score.png" alt="">
								作品总分({{workTotalScore}})=线上评分({{workOnlineScore}}*20%)+线下评分({{workUnderlineScore}}*80%)
							</div>
						</div>
						<div class="rule">
							<span style="color: #999;margin-bottom:10px;display:block">
								评分规则:作品总分为线上评分*20%+线下评分*80%<br/>
								如未付费只有线下评分，没有线上评分<br/>
							</span>
						</div>
						<a v-if="videoUrl" style="color: #007aff;margin-bottom:10px;display:block;" class="aaa" @click="tip()"  download="宝宝参赛视频">点击链接分享宝宝参赛视频</a>
						<div class='watchCertificateUrl' @click="watchCertificateUrl()">查看证书</div>
					</div>
				</div>
			</div>
			<pdf v-if="isShow" :src="certificateUrl"></pdf>
			<!--<iframe src="/static/pdf/web/viewer.html" width="100%" height="100%">查看证书</iframe>-->
			<div  class="rank-wrap"  v-if="sortList.length!=0">
				<div class="rankTitle"><img src="../../img/paihang.png" alt=""><span>排行榜</span></div>
				<div class="contentWrap"  v-if="index<3" v-for="(item,index) in sortList" :key="index">
					<div class="">
						<img v-if="index==0" src="../../img/one0.png" alt="">
						<img v-if="index==1" src="../../img/one1.png" alt="">
						<img v-if="index==2" src="../../img/one2.png" alt="">
					</div>
					<div class="content1">
						<div class="img">
							<div class="img-wrap">
								<img  @click="showBigImg(item.activityImgUrl)" :src="item.activityImgUrl" alt="">
							</div>
						</div>

						<div class="payInfo">
							<div class="payTitle">{{item.studentName}}<span style="color:#ff842c;">&nbsp;({{Number(item.workUnderlineScore*0.8+item.workOnlineScore*0.2).toFixed(2)}}分)</span>	</div>
							<div class="payClassHour"></div>
							<div>{{item.createTime}}</div>
						</div>
						<!--<div class="payPrice">
							作品评分
							<span>{{Number(item.workUnderlineScore*0.8+item.workOnlineScore*0.2).toFixed(2)}}分</span>

						</div>-->
						<div class="video" @click="showVideo(item.activityVideoUrl)">
							<img src="../../img/video.png" alt="">
						</div>
					</div>
				</div>

			</div>
			<div v-if="isViewVideo"  :class="{watchVideo:isViewVideo}" @click="hide()">
				<video  controls
						loop
						preload="auto"
						webkit-playsinline="true"
						playsinline="true"
						x5-video-player-type="h5"
						x5-video-player-fullscreen="true"
						x-webkit-airplay="allow"
						x5-video-orientation="portraint"
						@click="hide()">
					<source :src="videoUrl" type="video/mp4" />
				</video>
			</div>
			<div v-if="isView" :class="{viewImg:isView}" @click="hide()">
				<img :src="imgUrl" alt="">
			</div>
			<div class="noData" v-if="isNo1&&sortList.length==0">
				<img src="../../img/no.png" alt="">
				<div class="tip">暂无参赛数据</div>
			</div>
		</div>

		<div class="back" >
			<button @click="goBack()">返回</button>
		</div>
	</div>
</template>

<script>
	import request from '../../../../../static/js/request'
	import result from '../../../../../static/js/result';
	import pdf from 'vue-pdf';
	import getParam from '../../../../../static/js/getParam'
	export default {
		components:{
			pdf
		},
		data() {
			return {
				workInfo:[],
				videoUrl:this.$route.query.activityVideoUrl?this.$route.query.activityVideoUrl:'',
				imgUrl:this.$route.query.activityImgUrl?this.$route.query.activityImgUrl:'',
				workTotalScore: this.$route.query.workTotalScore?this.$route.query.workTotalScore:0,
				workOnlineScore: this.$route.query.workOnlineScore?this.$route.query.workOnlineScore:0,
				workUnderlineScore: this.$route.query.workUnderlineScore?this.$route.query.workUnderlineScore:0,
				activityEndTime:this.$route.query.activityEndTime?this.$route.query.activityEndTime:'',
				teachCommentTitle:this.$route.query.teachCommentTitle?this.$route.query.teachCommentTitle:'',
				sortList:[],
				certificateUrl:'http://ryx-oss.oss-cn-zhangjiakou.aliyuncs.com/pub/imgs/%E6%B5%8B%E8%AF%95%E5%B9%BC%E5%84%BF%E5%9B%AD%E5%B0%8F%E4%B8%80%E7%8F%AD%E6%B5%8B%E8%AF%95%E7%8E%8B%E4%BA%8C%E5%AE%9D1.pdf',
				rank:0,
				isViewVideo:false,
				isView:false,
				isNo : false,
				isNo1:false,
				isShow:false,
			}
		},
		mounted() {

		},
		created() {
			//this.search();
			this.getList();
			if(this.$route.query.teachCommentTitle=='null'||this.$route.query.teachCommentTitle=='undefined'){
				this.teachCommentTitle = '';
			}


		},
		methods: {
			watchCertificateUrl(){
				if(this.certificateUrl==''){
					weui.toast('暂未生成证书');
					return false;
				}else{
					this.isShow = true;
				}
			},
			/*aa(){
				console.log(this.certificateUrl)
			},
			watchCertificateUrl(){
				/!*window.open('http://ryx-oss.oss-cn-zhangjiakou.aliyuncs.com/pub/imgs/测试幼儿园小一班测试王二宝1.pdf');*!/
				window.open('/static/pdf/web/viewer.html?file=http://ryx-oss.oss-cn-zhangjiakou.aliyuncs.com/pub/imgs/测试幼儿园小一班测试王二宝1.pdf','PDF','width:50%;height:50%;top:100;left:100;');
			},*/
			tip(){
				//alert('点击右上角三个点可分享视频')
				location.href = this.$host+'/shareVideo.html?videoUrl='+this.videoUrl
				//window.open(this.videoUrl);
			},
			goBack(){
				this.$router.go(-1);
			},
			async getList(){
				let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
				let params = {
					activityId:this.$route.query.activityId,
					studentKindergartenId:this.$route.query.kindergartenId,
					access_token:this.$store.state.token
				};
				console.log(params);
				let listInfo = await request('/api/token/activity/member/list',
						'post', params,'application/x-www-form-urlencoded');
				// loading.hide()
				let res = result(listInfo);
				loading.hide()
				if(!res) return;
				console.log(res);
				for(let item of res){
					item.rank = 0;
					if(item.studentId==this.$route.query.studentId){
						this.workInfo.push(item);
						//this.certificateUrl = item.certificateUrl;
						this.videoUrl = item.activityVideoUrl;
						this.workOnlineScore = item.workOnlineScore;
						this.workTotalScore = Number((item.workUnderlineScore*0.8)+(item.workOnlineScore*0.2)).toFixed(2)//item.workTotalScore;
						this.workUnderlineScore = item.workUnderlineScore;
						this.teachCommentTitle = item.teachCommentTitle
					}
				}
				console.log('参赛数组',this.workInfo)
				let resArr = [];
				for(let item of res){
					item.rank = 0;
					item.workTotalScore = Number(item.workUnderlineScore*0.8+item.workOnlineScore*0.2).toFixed(2)
					resArr.push(item)
					this.sortList = resArr.sort(this.sort('workTotalScore'))
					console.log('结果结果',this.sortList)
					for(let i=0;i<this.sortList.length;i++){
						this.sortList[i].rank = i+1;
						if(this.sortList[i].studentId==this.$route.query.studentId){
							this.rank = i+1
						}
					}

				}
				console.log(this.workInfo)
				if(this.workInfo.length==0){
					this.isNo = false;
					this.isNo1 = true;
				}else {
					this.isNo = true;
					this.isNo1 = false;
				}
				console.log('排行数组',this.sortList)
				console.log('当前排名',this.rank)
				// this.endTime = res.activityMatch.activityEndTime
			},
			search(){
				weui.searchBar('#searchBar');
			},
			sort(property){//数组排序
				return function(a,b){
					var value1 = a[property];
					var value2 = b[property];
					return value2 - value1;
				}
			},
			showVideo(video){
				this.$router.push('/entriesVideo?videoUrl='+video)
				/*this.videoUrl = video;
				this.isViewVideo = true;*/
			},
			showBigImg(img){
				this.imgUrl = img
				this.isView = true;
			},
			hide(){
				this.videoUrl = '';
				this.isView = false
				this.isViewVideo = false;
			},

		},
		computed:{

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
		/*padding: 20rem / @rootFontSize;*/
		top: 0;
		left: 0;
		.box{
			width: 100%;
			height: 90%;
			overflow-y: scroll;
			padding: 20rem / @rootFontSize;
			box-sizing: border-box;
		}
		input::-webkit-input-placeholder {
			color: #999;
		}
		.content{
			margin-top:  30rem / @rootFontSize;
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
				/*display: flex;
				justify-content: space-between;
				flex-direction: column;*/
				.payTitle{
					//line-height: 36rem / @rootFontSize;
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
				span{
					color: #ff842c;
					margin-top:30rem / @rootFontSize;
					display: block;
				}
				.payed{
					color: slateblue;
				}
			}
		}
		.wrap{
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
			padding: 10rem / @rootFontSize;
			box-sizing: border-box;
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
				/*box-shadow: 0 0 16rem/ @rootFontSize #bababa;
				border-radius: 8px;*/
				width: 100%;
				height: auto;
				padding-bottom: 5px;
				margin-bottom: 30rem / @rootFontSize;
				.watchCertificateUrl{
				
					color: #CC00FF;
				}
				.img{
					padding: 30rem / @rootFontSize 0;
				}
				.comment{
					//font: 14px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif;
					//font: 14px/1.5 'Microsoft YaHei',arial,tahoma,\5b8b\4f53,sans-serif;
					//font: 13px/1 Tahoma,Helvetica,Arial,"\5b8b\4f53",sans-serif;
					font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
					display: flex;
					align-items: center;
					div{
						background-image: -webkit-linear-gradient(left,blue,#66ffff 10%,#cc00ff 20%,#CC00CC 30%, #CCCCFF 40%, #00FFFF 50%,#CCCCFF 60%,#CC00CC 70%,#CC00FF 80%,#66FFFF 90%,blue 100%);
						-webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
						-webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
						-webkit-background-size: 200% 100%;
						-webkit-animation: masked-animation 4s linear infinite;
						.font-dpr(13px);
						@keyframes masked-animation {
							0% {
								background-position: 0  0;
							}
							100% {
								background-position: -100%  0;
							}
						}
					}
					span{
						width: 30%;
						display: block;
						font-weight: bold;
					}
				}
				.score{
					padding:0 0 30rem / @rootFontSize 0;
					display: flex;justify-content: space-between;
					align-items: center;
					.scoreTitle{
						display: flex;
						align-items: center;
						color: #ff842c;
					}
				}
				.score1{
					color: #ff842c;
				}
				
				.rankNow{
					padding: 30rem / @rootFontSize 0;
					display: flex;
					justify-content: flex-end;
				}
				.productImg{
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					margin-bottom: 5px;
					.imgWrap{
						width: 200rem  / @rootFontSize ;
						height: 200rem  / @rootFontSize ;
						img{
							border-radius:8px 8px 0 0 ;
							width: 100%;
							height: 100%;
						}
					}
					video{
						width: 100%;
						//height: 500rem / @rootFontSize;
					}

					span{
						width: 40%;
						color: #959595;
						.font-dpr(14px);
					}
				}
				.productTitle{
					margin-left: 10rem / @rootFontSize!important;
					line-height: 14px;
					margin-bottom: 5px;
					display:-webkit-box;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2;
					overflow:hidden;
				}
				.productPrice{
					color: #ff842c;
				}
				.num{
					width: 100%;
					display: flex;
					justify-content: flex-end;
					span{
						color: #ff842c;
					}
				}
			}
		}
		.rank{
			width: 100%;
			.rankTitle{
				padding: 30rem / @rootFontSize 0;
				width: 100%;
				span{
					.font-dpr(14px)
				}
			}
			.rankWrap{
				color: #ff842c;
				.rankNum{
					display: flex;
					justify-content: center;
					margin-bottom: 30rem / @rootFontSize;
				}
				.workScore{
					display: flex;
					justify-content: flex-end;
				}
				.workName{
					display: flex;
					justify-content: flex-end;
					padding: 30rem / @rootFontSize 0;
				}
				video{
					width: 100%;
				}
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
		.contentWrap{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.content1{
				width: 80%;
				margin-top: 20rem / @rootFontSize;
				margin-bottom: 20rem / @rootFontSize;
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
					span{
						color: #ff842c;
						margin-top:30rem / @rootFontSize;
						display: block;
					}
					.payed{
						color: slateblue;
					}
				}
			}
		}

		.rankTitle{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100rem / @rootFontSize;
			background: #ff842c;
			span{
				color: #fff;
			}
		}
		.noData{
			width: 100%;
			height: 100%;
			position: relative;
			img{
				width: 100%;
				height: 100%;
			}
			.tip{
				color: #999;
				.font-dpr(18px);
				position: absolute;
				left:50%;
				top:80%;
				transform: translate(-50%, -50%);
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
		
		.aaa{
			
			display: block;
		}
		
	}
</style>
