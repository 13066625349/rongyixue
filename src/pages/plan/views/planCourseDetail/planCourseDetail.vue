<template>
   <div class="main">
        <div class="head-title">{{dataInfo.goodsName}}</div>
        <div class="content">
            <div class="cou-oth" v-if="dataInfo.goodsAtts && dataInfo.goodsAtts.length > 0">
                 <h2 class="cou-class-tit">课程附件：</h2>   
                 <!-- <div class=" cou-fj" v-for="(item,index) in dataInfo.goodsAtts" :key="index">
                     <video v-if="item.indexOf('.mp4') > -1" class="h5-video" :src="item" controls="controls"></video>
                     <audio v-else-if="item.indexOf('.mp3') > -1" :src="item" controls="controls"></audio>
                     <a v-else-if="item.indexOf('.ppt') > -1 || item.indexOf('.pptx') > -1" class="oth-file"  :href="item">点击下载课件</a>
                     <img v-else :src="item" alt="">
                 </div> -->
                 <div class=" cou-fj" v-for="(item,index) in topfile" :key="index">
                     <video v-if="item.indexOf('.mp4') > -1" class="h5-video" :src="item" controls="controls"></video>
                     <audio v-else-if="item.indexOf('.mp3') > -1" :src="item" controls="controls"></audio>
                 </div>
                 <div class=" cou-fj" v-for="(item,index) in cenfile" :key="index">
                     <img :src="item" alt="">
                 </div>
                 <div class=" cou-fj align-left" v-for="(item,index) in othfile" :key="index">
                     <a class="oth-file"  :href="item">点击下载课件</a>
                 </div>
            </div>
            <div class="cou-oth">
                 <h2 class="cou-class-tit">课程内容: </h2>
                 <div v-if="dataInfo.goodsDetails != ''" v-html="dataInfo.goodsDetails" class="cou-p"></div>                 
                 <div v-else style="text-align:center">
                     暂无
                 </div>
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
                    kindergarten:{}
                },
                pic:'',
                photo:'',
                region:'',
                goodsDetails:'',
                courseList:'',
                pageSize:1000,
                pageNum:1,
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
            async getDetail(){
                if(this.$route.query.id){
                    let params = {
                        id:this.$route.query.id
                    };
                    let getDetailInfo = await request('/api/goods/goodsKgplant/selectId?id='+this.$route.query.id,
                    'get',params,'application/x-www-form-urlencoded')
                    // loading.hide()
                    let res = result(getDetailInfo);
                    // console.log(res);
                    if(!res) return;
                    if(getDetailInfo.code == 0){
                        this.dataInfo = getDetailInfo.data;
                        if(getDetailInfo.data.images1 && getDetailInfo.data.images1.length >= 1){
                            this.pic = getDetailInfo.data.images1[0];
                        }
                        if(getDetailInfo.data.images2 && getDetailInfo.data.images2.length >= 1){
                            this.photo = getDetailInfo.data.images2[0];
                        }
                        if(getDetailInfo.data.region){
                            this.region = getDetailInfo.data.region.replace(/--/g,' ');
                        }
                        if(getDetailInfo.data.goodsAtts && getDetailInfo.data.goodsAtts.length>0){
                           var topfile = [];
                           var cenfile = [];
                           var othfile = [];
                           for(let i = 0;i<getDetailInfo.data.goodsAtts.length;i++){
                                let item = getDetailInfo.data.goodsAtts[i];
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
                        this.getCourseList(getDetailInfo.data.id);
                    }
                }
            },
            //获取课程列表
            async getCourseList(id){
                let params = {
                     kindergartenId:id,
                     pageSize: this.pageSize,
                     pageNum: this.pageNum,
                };
                const getCourseList = await request('/api/goods/goodsKgplant/list',
                    'post',params,'application/x-www-form-urlencoded')
                    // loading.hide()
                    let res = result(getCourseList);
                    // console.log(res);
                    if(!res) return;
                    if(getCourseList.code == 0){
                       this.courseList = getCourseList.rows;
                    }
            },
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
        .head-title{
            box-sizing: border-box;
            width: 100%;
            padding: 30rem/@rootFontSize;
            font-size: 42rem/@rootFontSize;
            line-height: 70rem/@rootFontSize;
            margin-bottom: 20rem/@rootFontSize;
            background: #fff;
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
            .cou-address{
                margin-top: 20rem/@rootFontSize;
                .address-text{
                    line-height: 40rem/@rootFontSize;
                    width: 100%;
                    height: 50rem/@rootFontSize;
                    img{
                        width: 40rem/@rootFontSize;
                        height: 40rem/@rootFontSize;
                        float: left;
                    }
                    span{
                        display: block;
                        height: 50rem/@rootFontSize;
                        float: left;
                        margin-left: 6rem/@rootFontSize;
                        font-size: 30rem/@rootFontSize;
                    }
                }
                .address-des{
                    width: 100%;
                    text-indent: 46rem/@rootFontSize;
                    color: #999;
                    line-height: 40rem/@rootFontSize;
                }
                
            }
        }
        .cou-title{            
            display: inline-block;
            font-size: 34rem/@rootFontSize;
            line-height:  50rem/@rootFontSize;
            font-weight: 600;
        }
        .cou-teach.gray{
            background: #f8f8fb;
        }
        .cou-teach{     
            padding: 20rem/@rootFontSize  20rem/@rootFontSize;      
            font-size: 30rem/@rootFontSize; 
            background: #fff;
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
                    display: block;
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
        .cou-data{
            padding: 30rem/@rootFontSize 20rem/@rootFontSize;
            background: #fff;
            margin-top: 20rem/@rootFontSize;
            margin-bottom: 20rem/@rootFontSize;
            .cou-data-row{
                width:100%;
                height: 40rem/@rootFontSize;
                margin-bottom: 20rem/@rootFontSize; 
                .cou-data-tit{                
                    font-size: 32rem/@rootFontSize;
                    float: left;  
                    font-weight: 600; 
                    line-height: 40rem/@rootFontSize;            
                }
                .cou-data-more{
                    float: right;
                    color: #999;
                    height: 40rem/@rootFontSize;
                    span{
                        line-height: 40rem/@rootFontSize;
                        float: left;
                        height: 40rem/@rootFontSize;
                    }
                    .ico-right{
                        width: 30rem/@rootFontSize;
                        height: 30rem/@rootFontSize;
                        margin-top: 5rem/@rootFontSize;
                        display: block;
                        float: left;
                        text-decoration: none;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                    
            }
            
            .data-list{
                width: 100%;
                margin-top: 20rem/@rootFontSize;
                box-sizing: border-box;
                float: left;
                .data-item{
                    width: 345rem/@rootFontSize;
                    height: 345rem/@rootFontSize;
                    float: left;
                    background: #fff;
                    // margin-bottom: 40rem/@rootFontSize;
                    border-radius: 30rem/@rootFontSize;
                    box-sizing: border-box;
                    box-shadow: 6rem/@rootFontSize 6rem/@rootFontSize 6rem/@rootFontSize #E0E8EB;
                    .data-pic{
                        width: 100%;
                        height: 186rem/@rootFontSize;
                        border-radius: 30rem/@rootFontSize;
                        margin-bottom: 10rem/@rootFontSize;
                    }
                    .data-title{
                        width:100%;
                        height: 120rem/@rootFontSize;
                        margin-bottom: 10rem/@rootFontSize;
                        padding:0 10rem/@rootFontSize;
                        box-sizing: border-box;
                        .data-t-text{
                            display: inline;
                            font-size: 28rem/@rootFontSize;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            height:  80rem/@rootFontSize;
                            line-height:  40rem/@rootFontSize;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            .data-t-tag{
                                display: inline-block;
                                background: #ff5e50;
                                height: 36rem/@rootFontSize;
                                line-height: 36rem/@rootFontSize;
                                color: #fff;
                                padding:0 6rem / @rootFontSize;
                                border-radius:6rem/@rootFontSize;
                                margin-right: 10rem/@rootFontSize;
                                font-size: 26rem/@rootFontSize;
                            }
                        }
                        .data-des{
                            color: #969da6;
                            width: 100%;
                            height: 30rem/@rootFontSize;
                            line-height: 30rem/@rootFontSize;
                            overflow: hidden;
                            margin:0 10rem/@rootFontSize;
                            margin-top: 10rem/@rootFontSize;
                        }
                    }
                }
                .data-item:nth-child(2n){
                    margin-left: 20rem/@rootFontSize;
                }
                @media screen and (min-width: 700px) {
                    .data-item{
                        margin-left: 20rem/@rootFontSize;
                    }
                }
            }
            .clear{
                clear: both;
            }
        }
        
        .cou-oth{
            width: 100%;
            padding: 20rem/@rootFontSize 20rem/@rootFontSize;
            background: #fff;
            margin-top: 20rem/@rootFontSize;
            box-sizing: border-box;
            line-height: 40rem/@rootFontSize;
            font-size: 28rem/@rootFontSize;            
            .oth-file{
                color:#1a7bb9;
                text-decoration: underline;
            }
            .cou-fj{
                margin-bottom: 20rem/@rootFontSize;
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
            p{
                padding: 0 20rem/@rootFontSize;
                box-sizing: border-box;
            }
            .cou-p{
                margin-left: -20rem/@rootFontSize;
                margin-right: -20rem/@rootFontSize;
                p{
                    padding: 0;
                    box-sizing: border-box;
                }
            }            
            img{
                width: 100%;
                margin: 0 auto;
                display: block;
            }
        }
    }
</style>