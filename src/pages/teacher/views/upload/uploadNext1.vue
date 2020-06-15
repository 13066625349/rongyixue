<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
		<div class="userInfo">
			<span class="marL">参赛信息</span>
			<div class="info">
				<!--<div class="kindergartenName">
					<span>幼儿园</span>
					<span class="spanStyle" @click="pickerSchool()" v-show="kindergartenName==''">请选择幼儿园</span>
					<span class="spanStyle"  v-show="kindergartenName!=''" @click="pickerSchool()">{{kindergartenName}}</span>
				</div>
				<div class="xian"></div>
				<div class="classes">
					<span>班级</span>
					&lt;!&ndash;<input type="text" placeholder="请输入班级" v-model="classes" @click="">&ndash;&gt;
					<span class="spanStyle"  @click="pickerClass()" v-show="classes==''">请选择班级</span>
					<span class="spanStyle" v-show="classes!=''" @click="pickerClass()">{{classes}}</span>
				</div>
				<div class="xian"></div>-->
                <div class="upVideo">
                    <span>参赛视频</span>
                    <div class="wrap">
                        <div type="primary" :class="{wrapper:true,disables:isExpired}" style="color: #fff">
                            <label class="btn" for="fileUpload">更新参赛视频</label>
                        </div>
                        <input type="file" accept="video/*" :disabled="isExpired" id="fileUpload" style="position:absolute; clip:rect(0 0 0 0);"  @change="uploadVideo($event)" >
                    </div>

                </div>

                <div class="video">
                    <span>视频预览</span>
                    <div class="viewVideo" @click="viewVideo()"><span>查看视频</span></div>
                </div>
                <div class="xian"></div>
			</div>
		</div>
        <div class="uploadImg">
            <span>主视角照片</span>
            <div class="up">
                <img :src="showImg?showImg:require('../img/addjia.png')" alt="">
                <img :class="{delete:true,show:isShow}" @click="deleteImg()" src="../img/delete.png" alt="">
                <form enctype="multipart/form-data">
                    <input class="upImg" :disabled="isExpired" type="file" name="image" accept="image/*" @change='upImg' ref="upImg">
                </form>
            </div>
        </div>
       <!-- <div class="showBigImg" >
            <span @click="showBigImg()">查看大图</span>
        </div>-->
        <div class="showBigImg">
            <span>图片预览</span>
            <div class="show" @click="showBigImg()"><span>查看大图</span></div>
        </div>
        <div class="score">
            <span>此作品评分</span>
            <input type="number" :disabled="isExpired" placeholder="请输入评分" v-model="score">
        </div>
		<div class="signUp" >
			<button :class="{disables:isExpired?isExpired:false}" @click="isExpired?editUp():''">修改</button>
		</div>
        <div v-if="isView" :class="{viewImg:isView}" @click="hide()">
            <img :src="showImg" alt="">
        </div>
        <div v-if="isViewVideo" :class="{watchVideo:isViewVideo}" @click="hide()">
            <video  controls="controls">
                <source :src="videoUrl" type="video/mp4" />
            </video>
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
                score:this.$route.query.score?this.$route.query.score:'',
                showImg:this.$route.query.showImg?this.$route.query.showImg:'',
                videoUrl:this.$route.query.videoUrl?this.$route.query.videoUrl:'',
                file:'',
                isView:false,
                isViewVideo:false,
                isShow:false,
				/*kindergartenName:'',//幼儿园名字
				kindergartenId:0,//幼儿园ID
				classes:'',//班级名称
				baseClassID:0,//班级ID
				classesInfo:[],//班级信息数组
				kindergartenInfo:[],//幼儿园信息数组
				isChange:false,*/
                isExpired:false

			}
		},
		mounted() {

		},
		created() {
            if(this.showImg){
                this.isShow = true;
            }
            if(this.$route.query.isExpired=='true'){
                this.isShow = false;
                this.isExpired = true
            }
            //this.isExpired = this.$route.query.isExpired
            console.log(this.isExpired)
			//this.getKindergarten();

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
            uploadVideo(e) {
                //e.target.value文件名
                let file = e.target.files[0];
                console.log('文件',file)
                let formData = new FormData();
                let fileSize = (file.size).toFixed(0);
                formData.append('file', file,file.name);
                console.log('正在上传视频...')
                this.doUpload(formData,fileSize);
            },
            doUpload(formData,fileSize) {
                let loading = weui.loading('loading', {
                    className: 'custom-classname'
                });
                let size = 5*1024*1024;
                if(fileSize>size){
                    loading.hide();
                    console.log('进来了')
                    weui.alert('视频大小不能超过5M，请上传20s左右视频');
                    return false;
                }
                axios.post('/api/base/common/common/uploadAliOss', formData).then(res => {
                    loading.hide();
                    console.log(res)
                    if (res.data.status==0) {
                        this.videoUrl = res.data.message
                        weui.toast('上传视频成功');
                    } else {
                        weui.alert(res.data.message)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            upImg (e) {
                let loading = weui.loading('loading', {
                    className: 'custom-classname'
                });

                let file = e.target.files[0]
                let formData = new window.FormData();
                //formData.avatarFile = file.name
                formData.append('file', file,file.name);
                //formData.append('access_token',this.$store.state.token)
                console.log(file.name)
                console.log('上传文件',formData.get('file'))
                this.showImg = window.URL.createObjectURL(e.target.files[0]);
                axios.post('/api/base/common/common/uploadAliOss', formData).then(res => {
                    loading.hide();
                    if (res.data.status==0) {
                        this.isShow = true;
                        this.showImg = res.data.message;
                        weui.toast('上传照片成功');
                    } else {
                        weui.alert(res.data.message)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            deleteImg(){
			    this.isShow = false;
			    this.showImg = '';
            },
            showBigImg(){
			    if(this.showImg == ''){
			        weui.alert('请先上传图片');
			        return false;
                }
			    this.isView = true;
                /*let gallery = weui.gallery(this.showImg, {
                    className: 'showBigImg',
                    onDelete: function(){
                        weui.confirm('确定删除该图片？', function(){
                            _this.$nextTick(()=>{

                                this.showImg = '';
                                this.isShow = false;
                                let showBigImg = document.getElementsByClassName('showBigImg')[0]
                                showBigImg.className="hide";
                                console.log(this.showImg)
                            })}, function(){
                            console.log('no') });

                    }
                });*/
            },
            viewVideo(){
			    console.log('视频',this.videoUrl)
                if(this.videoUrl == ''){
                    weui.alert('请先上传视频');
                    return false;
                }
			    this.isViewVideo = true;
            },
            hide(){
			    this.isView = false;
			    this.isViewVideo = false;
            },
			/**
			 * 上传信息
			 * */
			async editUp(){
                if(this.videoUrl == ''){
                    weui.alert('请上传视频');
                    return false;
                }
                if(this.showImg == ''){
                    weui.alert('请上传主视角照片');
                    return false;
                }
                if(!this.score){
                    weui.alert('请填写该作品评分');
                    return false;
                }
                let params = {
                    id:this.$route.query.id,
                    activityMember:this.$route.query.activityMember,
                    workUnderlineScore:this.score,
                    activityImgUrl:this.showImg,
                    activityVideoUrl:this.videoUrl,
                    access_token : this.$store.state.expertToken,
                    isVisible:0

                }
                let uploadInfo = await request('/api/token/activity/member/edit',
                    'post', params, 'application/x-www-form-urlencoded')
                // loading.hide()
                let info = result(uploadInfo)
                // loading.hide()
                if(!info) return;
                console.log('上传结果',info)
                weui.alert('修改成功')
                this.$router.go(-2);
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

        .showBigImg{
            padding-left: 20rem / @rootFontSize;
            .font-dpr(14px);
            display: flex;
            width: 100%;
            height: 80rem / @rootFontSize;
            background: #fff;
            position: relative;
            box-sizing: border-box;
            span{
                line-height: 80rem / @rootFontSize;
                color: #999;
                width: 30%;

            }
            .show{
                display: flex;
                justify-content: flex-end;
                align-items: center;
                width: 70%;
                height: 100%;
                border: none;
                text-align: right;
                padding-right: 100rem / @rootFontSize;
                box-sizing: border-box;
                line-height: 80rem / @rootFontSize;
                color: #999;
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
					//margin-bottom: 10rem / @rootFontSize;
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
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        width: 70%;
                        height: 100%;
                        border: none;
                        text-align: right;
                        padding-right: 100rem / @rootFontSize;
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
            padding: 30rem / @rootFontSize;
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
        .upVideo{
            padding: 30rem / @rootFontSize 0;
        }
        .disables{
            background: #bababa!important;
        }

	}
</style>