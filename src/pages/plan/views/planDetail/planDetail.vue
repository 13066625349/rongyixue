<template>
   <div class="main">
        <div class="head-cover">
            <img v-if="pic"  class="data-pic"  :src="pic" alt="">
            <img v-else   class="data-pic"  src="../img/icon_empty_1.png" alt="">
        </div>
        <div class="content">
            <div class="cou-title-box">
                <div class="cou-title">
                    {{dataInfo.kindergartenName}}
                </div>
                <div class="cou-address">                    
                    <p class="address-text">
                        <img class="ico-address" src="../img/ico-address.png">
                        <span>{{dataInfo.address}}</span>
                    </p>
                    <p class="address-des">地区：{{region}}</p>
                    <!-- <p class="address-des">距地铁2号线营盘街站A口步行730m</p> -->
                </div>
            </div>
            <div class="cou-teach gray">
                <h2 class="cou-teach-title">园长介绍</h2>
                <!-- <span class="spc-name">{{dataInfo.kindergarten.principalName}}</span> -->
                <div class="cou-teach-box">
                    <img v-if="photo"  class="cou-teach-photo"  :src="photo" alt="">
                    <img v-else   class="cou-teach-photo"  src="../img/perImg.png" alt="">
                    <p class="cou-teach-name">
                        <span class="tit">园长</span>
                        <span class="name">{{dataInfo.principalName}}</span>
                    </p>
                </div>               
            </div>
            <div class="cou-teach">
                 <div class="teach-des">
                    <p class="teach-label">园长简历:</p>
                    <p class="teach-con">{{dataInfo.principalDetails}}</p>
                </div>
            </div>
            <div class="cou-data" style="display:none">
                <div class="cou-data-row">
                    <h2 class="cou-data-tit">课程</h2>
                    <p class="cou-data-more">
                        <span>查看更多</span>
                        <s class="ico-right"><img src="../img/ico-right.png"></s>
                    </p>
                </div>                
                <div class="data-list">                
                    <div class="data-item">
                        <img class="data-pic" src="../img/pic1.jpg" alt="">
                        <div class="data-title">                        
                            <h2 class="data-t-text"><span class="data-t-tag">名师</span>轻松学懂文言文_拆解套路搞定中小学</h2>
                            <p class="data-des">授课：方一笑</p>
                        </div>                   
                    </div>
                    <div class="data-item">
                        <img class="data-pic" src="../img/pic2.jpg" alt="">
                        <div class="data-title">                        
                            <h2 class="data-t-text"><span class="data-t-tag">名师</span>轻松学懂文言文_拆解套路搞定中小学</h2>
                            <p class="data-des">授课：方一笑</p>
                        </div>                   
                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="cou-oth">
                 <h2 class="cou-class-tit">幼儿园介绍：</h2>                
                {{dataInfo.kindergartenDetails}}
                   <!-- <img src="../img/des2.jpg" alt=""> -->
            </div>
            <div class="cou-oth bom30">
                 <h2 class="cou-class-title">课程列表</h2>
                 <!-- <div v-html="dataInfo.goodsDetails" class="cou-p"></div> -->
                 <div class="cou-class-list" v-for="(item,index) in courseList" :key="index" @click="goCourseDetail('/PlanCourseDetail?id='+item.id)">
                     <h2>{{index+1}}. {{item.goodsName}}</h2>
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
			}
		},
		mounted() {

		},
		created() {
            this.getDetail();
		},
		methods: {
            async getDetail(){
                if(this.$route.query.id){
                    let params = {
                        id:this.$route.query.id
                    };
                    // let getDetailInfo = await request('/api/goods/goodsKgplant/selectId?id='+this.$route.query.id,
                    let getDetailInfo = await request('/api/base/kindergarten/select/'+this.$route.query.id,
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
                            this.photo = getDetailInfo.data.portrait;
                        }
                        if(getDetailInfo.data.region){
                            this.region = getDetailInfo.data.region.replace(/--/g,' ');
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
            goCourseDetail(url){
                this.$router.push(url);
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
                height: 110rem/@rootFontSize;
                margin: 30rem/@rootFontSize 0;
                img{
                    width: 110rem/@rootFontSize;
                    height: 110rem/@rootFontSize;
                    // height: 90rem/@rootFontSize;
                    display: block;
                    float: left;
                    // border-radius: 20rem/@rootFontSize;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .cou-teach-name{
                    width: 200rem/@rootFontSize;
                    height: 100%;
                    padding: 10rem/@rootFontSize 0;
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
                        margin-top:5rem/@rootFontSize;
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
                margin-bottom: 30rem/@rootFontSize;
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
            .cou-class-tit{
                font-size: 30rem/@rootFontSize;
                font-weight: 500;
                margin-bottom: 20rem/@rootFontSize;
                                // color: #404040;
                // margin-left: 10rem/@rootFontSize;
            }
            .cou-class-title{
                text-align: center;
                font-size: 34rem/@rootFontSize;
                line-height: 60rem/@rootFontSize;
                font-weight: 600;
                margin-bottom: 20rem/@rootFontSize;
                border-bottom:  2rem/@rootFontSize dotted #ddd;
                // display: inline-block;
                // margin: 0 auto;
                // text-decoration: underline;

            }
            .cou-class-list{
                line-height: 45rem/@rootFontSize;
                height: 45rem/@rootFontSize;
                text-align: left;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                // text-decoration: underline;
                font-weight: bold;
                font-size: 28rem/@rootFontSize;
                color:#333;
                // color: #1e82d2;
                margin-bottom: 10rem/@rootFontSize;
            }
            .cou-class-list:hover{
                color: #ff5e50;
            }
            p{
                padding: 0 20rem/@rootFontSize;
                box-sizing: border-box;
            }
            .cou-p{
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
        .cou-oth.bom30{
            padding-bottom: 40rem/@rootFontSize;
            margin-bottom: 30rem/@rootFontSize;
            text-align: center;
        }
    }
</style>