<template>
    <div class="main">
        <div class="head-cover">
            <img v-if="dataInfo.attachment"  class="data-pic"  :src="dataInfo.attachment" alt="">
            <img v-else   class="data-pic"  src="../img/icon_empty_1.png" alt="">
        </div>
        <div class="content">
            <div class="cou-title-box">
                <div class="cou-title">
                    <span class="cou-tag">名师</span>
                    {{dataInfo.goodsName}}
                </div>
            </div>
            <div class="cou-oth" v-if="topfile && topfile.length > 0">
                 <h2 class="cou-class-tit">课程附件：</h2>  
                 <!-- <div class=" cou-fj" v-for="(item,index) in dataInfo.goodsImgs" :key="index">
                     <video v-if="item.indexOf('.mp4') > -1" class="h5-video" :src="item" controls="controls"></video>
                     <audio v-else-if="item.indexOf('.mp3') > -1" :src="item" controls="controls"></audio>
                     <a v-else-if="item.indexOf('.ppt') > -1 || item.indexOf('.pptx') > -1" class="oth-file"  :href="item">点击下载课件</a>
                     <img v-else :src="item" alt="">
                 </div>              -->
                 <div class=" cou-fj" v-for="(item,index) in topfile" :key="index">
                     <video v-if="item.indexOf('.mp4') > -1" class="h5-video" :src="item" controls="controls"></video>
                     <audio v-else-if="item.indexOf('.mp3') > -1" :src="item" controls="controls"></audio>
                 </div>
                 <div class=" cou-fj" v-for="(item,index) in cenfile" :key="index">
                     <img :src="item" alt="">
                 </div>
                 <div class=" cou-fj align-left" v-for="(item,index) in cenfile" :key="index">
                     <a class="oth-file"  :href="item">点击下载课件</a>
                 </div>
            </div>
            <div class="cou-teach gray">
                <h2 class="cou-teach-title">授课老师</h2>
                <span class="name spc-name" >{{dataInfo.professor}}</span>                
                <!-- <div class="cou-teach-box">
                    <img class="cou-teach-photo" src="../img/perImg.png" alt="">
                    <p class="cou-teach-name">
                        <span class="tit">授课</span>
                        <span class="name">{{dataInfo.professor}}</span>
                    </p> -->
                    <!-- <p class="cou-teach-tag">所获荣誉: 300人</p> -->
                <!-- </div>                -->
            </div>
            <div class="cou-teach">
                 <div class="teach-des">
                    <p class="teach-label">名师荣誉:</p>
                    <p class="teach-con">{{dataInfo.honour}}</p>
                    <p class="teach-label">名师简介:</p>
                    <p class="teach-con">{{dataInfo.professorDetails}}</p>
                </div>
            </div>
            <div class="cou-oth" v-if="cenfile.length > 0 || othfile.length > 0">
                 <h2 class="cou-class-tit">其他附件：</h2>  
                 <!-- <div class=" cou-fj" v-for="(item,index) in dataInfo.goodsImgs" :key="index">
                     <video v-if="item.indexOf('.mp4') > -1" class="h5-video" :src="item" controls="controls"></video>
                     <audio v-else-if="item.indexOf('.mp3') > -1" :src="item" controls="controls"></audio>
                     <a v-else-if="item.indexOf('.ppt') > -1 || item.indexOf('.pptx') > -1" class="oth-file"  :href="item">点击下载课件</a>
                     <img v-else :src="item" alt="">
                 </div>              -->
                 <div class=" cou-fj" v-for="(item,index) in cenfile" :key="index">
                     <img :src="item" alt="">
                 </div>
                 <div class=" cou-fj align-left" v-for="(item,index) in othfile" :key="index">
                     <a class="oth-file"  :href="item">点击下载课件</a>
                 </div>
            </div>
            <div class="cou-class" v-show="isShow">
                <h2 class="cou-class-tit">课程</h2>
                <div  class="cou-class-box">
                    <div class="class-row">
                        <p class="class-num">第1讲</p>
                        <p class="class-name">《滥竽充数》：用“故事”打开文章内容</p>
                        <p class="class-state">已上线</p>
                    </div>
                    <div class="class-row">
                        <p class="class-num">第2讲</p>
                        <p class="class-name">《滥竽充数》：用“故事”打开文章内容</p>
                        <p class="class-state">已上线</p>
                    </div>
                    <div class="class-row">
                        <p class="class-num">第3讲</p>
                        <p class="class-name">《滥竽充数》：用“故事”打开文章内容</p>
                        <p class="class-state">已上线</p>
                    </div>
                </div>
                <div class="cou-class-more">
                    <p class="class-more-text" @click="goCourseList('/courseList?id=')">查看全部15次课</p>
                </div>
            </div>
            <div class="cou-oth">
                  <!-- <h2 class="cou-class-tit">课程简介: </h2> -->
                  <div v-html="dataInfo.goodsDetails"></div>
            </div>
            
        </div>
    </div>
</template>

<script>
	import request from '../../../../static/js/request'
	import result from '../../../../static/js/result'
	export default{
		data() {
			return {
                dataInfo:{
                   goodsName:"",
                   attachment:"",
                   professor:"",
                   professorDetails:"",
                   goodsDetails:"",
                },
                isShow:false,
                topfile:[],
                cenfile:[],
                othfile:[],

			}
		},
		mounted() {

		},
		created() {
            this.getDetail();
            this.getUserInfo();
		},
		methods: {
            goCourseList(url){
                this.$router.push(url);
            },
		    // goBack(){
		    //     this.$router.go(-1)
            // },
            async getUserInfo(){
                let params  = {

                }

                let getUserInfo = await request('/api/token/base/info/getUser?access_token='+this.$store.state.token,
                    'get',params,'application/x-www-form-urlencoded')
                // loading.hide()
                let info = result(getUserInfo)
                console.log('获取电话号失败信息',getUserInfo)
                // loading.hide()
                if(getUserInfo.code == 500){
                    this.$store.commit('setPhone', '');
                    this.$router.push('/login')
                }
                if(!info) return;
                console.log('获取电话号成功信息',getUserInfo)
                this.$store.commit('setPhone', getUserInfo.msg);
            },
            async getDetail(){
                if(this.$route.query.id){
                    let params = {
                        id:this.$route.query.id
                    };
                    let getDetailInfo = await request('/api/goods/goodsHigh/selectId/?id='+this.$route.query.id,
                        'get',params,'application/x-www-form-urlencoded')
                    // loading.hide()
                    let res = result(getDetailInfo);
                    if(!res) return;
                    if(getDetailInfo.code == 0){
                        this.dataInfo = getDetailInfo.data;
                        if(getDetailInfo.data.goodsImgs && getDetailInfo.data.goodsImgs.length>0){
                           var topfile = [];
                           var cenfile = [];
                           var othfile = [];
                           for(let i = 0;i<getDetailInfo.data.goodsImgs.length;i++){
                                let item = getDetailInfo.data.goodsImgs[i];
                                if(item.indexOf('.mp4') > -1 || item.indexOf('.mp3') > -1){
                                    topfile.push(item);
                                }
                                else if(item.indexOf('.ppt') > -1|| item.indexOf('.pptx') > -1){
                                    othfile.push(item);
                                }
                                else{
                                    cenfile.push(item);
                                }
                           }
                           this.topfile = topfile;
                           this.cenfile = cenfile;
                           this.othfile = othfile;

                        }
                    }
                }     

		    }
		}
	}
</script>

<style lang="less" >
	@import "~static/css/minxin.less";
    .main{
        width: 100%;        
        box-sizing: border-box;
		position: relative;
        overflow-y: scroll;
		top: 0;
        left: 0;
        background: #f8f8fb;
        .head-cover{
            width: 100%;
            height: 380rem / @rootFontSize;
            overflow: hidden;
            img{
                width: 100%;
                height:100%;
            }
        }
        .content{
            width: 100%;
            // padding: 20rem/@rootFontSize;
            box-sizing: border-box;
            margin-bottom: 30rem/@rootFontSize;
        }
        .cou-title-box{
            padding: 20rem/@rootFontSize;
            background: #fff;
            box-sizing: border-box;
            margin-bottom: 20rem/@rootFontSize;
        }
        .cou-title{            
            display: inline-block;
            font-size: 34rem/@rootFontSize;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            height:  100rem/@rootFontSize;
            line-height:  50rem/@rootFontSize;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-weight: 600;
            .cou-tag{
                font-size: 30rem/@rootFontSize;
                display: inline-block;
                background: #ff5e50;
                height: 35rem/@rootFontSize;
                line-height: 35rem/@rootFontSize;
                color: #fff;
                padding:4rem / @rootFontSize 16rem / @rootFontSize;
                border-radius:30rem/@rootFontSize;
                margin-right: 6rem/@rootFontSize;
                font-size: 26rem/@rootFontSize;
                font-weight: normal;
                font-family: 'microsoft yahei'
            }
        }
        .cou-teach.gray{
            background: #f8f8fb;
        }
        .cou-teach{     
            padding: 20rem/@rootFontSize  20rem/@rootFontSize;      
            font-size: 30rem/@rootFontSize; 
            background: #fff;
            padding-bottom: 26rem/@rootFontSize;
            // margin-bottom: 10rem/@rootFontSize;
            .cou-teach-title{
                font-size: 32rem/@rootFontSize;
                font-weight: 600;
                color: #404040;
            }
            .spc-name{
                font-size: 28rem/@rootFontSize;
                font-weight: normal;
                margin-top: 20rem/@rootFontSize;
                display: inline-block;
            }
            .cou-teach-box{
                margin: 30rem/@rootFontSize 0;
                img{
                    width: 110rem/@rootFontSize;
                    width: 110rem/@rootFontSize;
                    display: block;
                    float: left;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .cou-teach-name{
                    width: 200rem/@rootFontSize;
                    height: 100%;
                    padding: 20rem/@rootFontSize 0;
                    margin-left: 20rem/@rootFontSize;
                    box-sizing: border-box;
                    float: left;
                    .tit{
                      width: 100%;
                      height: 35rem/@rootFontSize;
                      display: block;
                        font-size: 22rem/@rootFontSize;
                        color: #999;
                    }
                    .name{
                        width: 100%;
                        height: 35rem/@rootFontSize;
                        display: block;
                        font-size: 24rem/@rootFontSize;
                    }
                }
                .cou-teach-tag{
                    border: 1px solid #ec6958;
                    display: inline-block;
                    color: #ec6958;
                    padding: 10rem/@rootFontSize 20rem/@rootFontSize;
                    border-radius: 16rem/@rootFontSize;
                    font-size: 22rem/@rootFontSize;
                    float: right;
                    margin-top: 40rem/@rootFontSize;
                }
            }
            .cou-teach-box:after{
                content: '';
                width: 0;
                height: 0;
                display: block;
                clear: both;
            }
            .teach-des{
                line-height: 50rem/@rootFontSize;
                .teach-label{
                    width: 100%;
                    height:50rem/@rootFontSize;
                    margin-bottom: 30rem/@rootFontSize;
                }
                .teach-con{
                    width: 100%;
                    margin-bottom: 30rem/@rootFontSize;
                }
            }
        }
        .cou-class{
            margin-top: 20rem/@rootFontSize;
            background: #fff;
            padding: 20rem/@rootFontSize;
            .cou-class-tit{
                font-size: 32rem/@rootFontSize;
                font-weight: 600;
                margin-bottom: 40rem/@rootFontSize;
                color: #404040;
            }
            .cou-class-box{
                width:100%;
                font-size: 32rem/@rootFontSize;
                .class-row{
                    width:100%;
                    height: 60rem/@rootFontSize;
                    line-height: 60rem/@rootFontSize;
                    overflow: hidden;
                    margin-bottom: 20rem/@rootFontSize;
                    .class-num{
                        width: 15%;
                        height: 100%;
                        display: block;
                        float: left;
                        font-size: 26rem/@rootFontSize;
                        color: #999;
                        overflow: hidden;
                    }
                    .class-name{
                         width: 70%;
                        height: 100%;
                        display: block;
                        float: left;
                        font-size: 36rem/@rootFontSize;
                        color: #333;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow:ellipsis;
                    }
                    .class-state{
                         width: 15%;
                        height: 100%;
                        display: block;
                        float: left;
                        font-size: 26rem/@rootFontSize;
                        overflow: hidden;
                        text-align: right;
                    }
                }
            }
            .cou-class-more{
                background: #fff;
                text-align: center;
                margin: 20rem/@rootFontSize 0;
                .class-more-text{
                   font-size: 30rem/@rootFontSize;
                   text-align: center;
                   padding: 14rem/@rootFontSize 40rem/@rootFontSize ;
                   background: #f5f5f6;
                   display: inline-block;
                   margin: 20rem/@rootFontSize;
                   border-radius: 30rem/@rootFontSize;
                }
            }
        }
        .cou-oth{
            width: 100%;
            padding: 20rem/@rootFontSize 10rem/@rootFontSize;
            background: #fff;
            margin-top: 20rem/@rootFontSize;
            box-sizing: border-box;
            .cou-fj{
                margin-bottom: 30rem/@rootFontSize;
                text-align: center;
                .h5-video{
                    width: 100%;
                    height: auto;
                }
                img{
                    width: auto;
                    max-width: 100%;
                    margin:0 auto;
                }
                .oth-file{
                    color:#1a7bb9;
                    text-decoration: underline;
                    line-height: 40rem/@rootFontSize;
                    font-size: 28rem/@rootFontSize;
                }
            }            
            .cou-fj.align-left{
                text-align: left;
            }
            .cou-class-tit{
                font-size: 30rem/@rootFontSize;
                font-weight: 500;
                margin-bottom: 20rem/@rootFontSize;
                                // color: #404040;
                // margin-left: 10rem/@rootFontSize;
            }
            .cou-class-tit{
                font-size: 32rem/@rootFontSize;
                // font-weight: 600;
                margin-bottom: 20rem/@rootFontSize;
                // color: #404040;
                margin-left: 10rem/@rootFontSize;
            }
            p,span{
                line-height: 40rem/@rootFontSize;
            }
            img{
                max-width: 100% !important;
            }
        }
    }
</style>