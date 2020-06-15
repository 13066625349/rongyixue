<template>
	<div class="main1">
		<div v-wechat-title="$route.meta.title"></div>
        <div class="title">
            <div class="developTitle">
                <div class="kuai"></div>
                <div class="title1">主题</div>
            </div>

            <div class="productTitle">{{theme}}</div>

        </div>
        <div class="developTarget">
            <div class="developTitle">
                <div class="kuai"></div>
                <div class="title1">比赛规则</div>
            </div>
            <div class="developContent">
                {{activityRule}}
            </div>
        </div>
        <div class="gameDetail">
            <div class="gameTitle">
                <div class="kuai"></div>
                <div class="title1">比赛时间</div>
            </div>
            <div class="gameContent" >
                &ensp;{{activityStartTime.split(' ')[0]}}---{{activityEndTime.split(' ')[0]}}
            </div>
        </div>
        <div class="gameDetail">
            <div class="gameTitle">
                <div class="kuai"></div>
                <div class="title1">比赛地点</div>
            </div>
            <div class="gameContent" >
                &ensp;{{activityAddress}}
            </div>
        </div>
        <div class="gameDetail">
            <div class="gameTitle">
                <div class="kuai"></div>
                <div class="title1">比赛内容</div>
            </div>
            <div class="gameContent" v-html="activityContent">

            </div>
        </div>
        <div class="signUpOnline">
            <button @click="goDetail('/uploadList?id='+$route.query.id+'&endTime='+activityEndTime+'&kindergartenId='+$route.query.kindergartenId+'&activityId='+$route.query.activityId+'&baseClassID='+$route.query.baseClassID)">上传学生视频</button>
        </div>
	</div>
</template>

<script>
	import request from '../../../../static/js/request'
	import result from '../../../../static/js/result'
    import Swiper from '../../../../static/js/swiper/swiper';
	export default{
		data() {
			return {
                theme:'',
                activityRule:'',
                activityAddress:'',
                activityContent:'',
                activityStartTime:'',
                activityEndTime:''
			}
		},
		mounted() {

		},
		created() {
            this.getDetail();
		},
		methods: {
            async getDetail(){
                console.log('接收参数',this.$route.query.id)
                /*let params = {
                    id:this.$route.query.id
                };*/
                if(this.$route.query.id){
                    let getDetailInfo = await request('/api/activity/match/selectId/'+this.$route.query.id,
                        'get')
                    // loading.hide()
                    let res = result(getDetailInfo);
                    console.log(res);
                    // loading.hide()
                    if(!res) return;
                    console.log('返回结果',getDetailInfo);
                    console.log(res)

                    this.theme = res.theme;
                    this.activityRule = res.activityRule;
                    this.activityAddress = res.activityAddress;
                    this.activityContent= res.activityContent;
                    this.activityStartTime = res.activityStartTime;
                    this.activityEndTime = res.activityEndTime;
                }



            },
            goDetail(url){
                this.$router.push(url)
            }
		}
	}
</script>

<style lang="less" >
	@import "~static/css/minxin.less";
    @import "../../../../static/js/swiper/swiper.css";
	.main1 {
        overflow-y:scroll ;
		width: 100%;
		height: 90%;
        box-sizing: border-box;
        //background: #f3f5fb;
		position: relative;
		top: 0;
		left: 0;
		input::-webkit-input-placeholder {
			color: #999;
		}
        .swiper-main{
            width:100%;
            height:500rem/ @rootFontSize;
            overflow:hidden;
            img{
                width:100%;
                height:100%;
        }

        /*.videoImg{
            width: 100%;
            height: 400rem / @rootFontSize;
            img{
                width: 100%;
                height: 100%;
            }
            .swiper-container {
                img{width:100%;height:400rem / @rootFontSize;}
            }*/


        }
        .title{
            background: #fff;
           /* display: flex;
            justify-content: space-between;
            align-items: center;*/
            padding: 40rem / @rootFontSize;
            margin-bottom: 20rem / @rootFontSize;
            box-sizing: border-box;
            .developTitle{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .font-dpr(14px);
                font-weight: bold;
                margin-bottom: 20rem / @rootFontSize;
                position: relative;
                .kuai{
                    display: inline-block;
                    width: 8rem / @rootFontSize;
                    height: 30rem / @rootFontSize;
                    background: #ff842c;
                    border-radius: 5px;
                    line-height: 30rem / @rootFontSize;
                    margin-right: 10rem / @rootFontSize;
                    position: absolute;
                    left: -20rem  / @rootFontSize;
                    top: 0;
                }

            }
            .productTitle{
                .font-dpr(14px);
                font-weight: bold;
                margin-bottom: 20rem / @rootFontSize;
            }
            .gameType{
                color: #959595;
                .font-dpr(12px);
                margin-bottom: 20rem / @rootFontSize;
            }
            .gameComponent{
                color: #959595;
                .font-dpr(12px);
            }
        }
        .price-wrap{
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 0 10rem/ @rootFontSize #bababa;
            border-radius: 5px;
            padding: 36rem / @rootFontSize 0;
            box-sizing: border-box;
            align-items: center;
            width: 120rem / @rootFontSize;
            height: 130rem / @rootFontSize;
            .price{
                color: #ff842c;
            }
        }
        .developTarget{
              background: #fff;

              padding: 40rem / @rootFontSize;
              margin-bottom: 20rem / @rootFontSize;
              box-sizing: border-box;
              .developTitle{
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .font-dpr(14px);
                  font-weight: bold;
                  margin-bottom: 20rem / @rootFontSize;
                  position: relative;
                  .kuai{
                      display: inline-block;
                      width: 8rem / @rootFontSize;
                      height: 30rem / @rootFontSize;
                      background: #ff842c;
                      border-radius: 5px;
                      line-height: 30rem / @rootFontSize;
                      margin-right: 10rem / @rootFontSize;
                      position: absolute;
                      left: -20rem  / @rootFontSize;
                      top: 0;
                  }

              }
              .developContent{
                  line-height: 36rem / @rootFontSize;
                  color: #959595;
                  img{
                      width: 100%;
                  }
              }
          }
        .gameDetail{
            background: #fff;

            padding: 40rem / @rootFontSize;
            //margin-bottom: 20rem / @rootFontSize;
            box-sizing: border-box;
            .gameTitle{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .font-dpr(14px);
                font-weight: bold;
                margin-bottom: 20rem / @rootFontSize;
                position: relative;
                .kuai{
                    display: inline-block;
                    width: 8rem / @rootFontSize;
                    height: 30rem / @rootFontSize;
                    background: #ff842c;
                    border-radius: 5px;
                    line-height: 30rem / @rootFontSize;
                    margin-right: 10rem / @rootFontSize;
                    position: absolute;
                    left: -20rem  / @rootFontSize;
                    top: 0;
                }

            }
            .gameContent{
                line-height: 20px;
                padding: 30rem / @rootFontSize;
                img{
                    width: 100%!important;
                }
                color: #999;
                .font-dpr(14px);
                box-sizing: border-box;
            }
        }
        .signUpOnline{
            z-index: 999;
            box-sizing: border-box;
            width: 100%;
            position: fixed;
            bottom: 40rem / @rootFontSize;
            left: 0;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80rem / @rootFontSize;
            padding: 40rem / @rootFontSize;
            button{
                display: block;
                width: 100%;
                height: 80rem / @rootFontSize;
                background: #ff842c;
                color: #fff;
                line-height: 80rem / @rootFontSize;
                text-align: center;
                border-radius: 20px;
                border: none;
            }
        }
	}
</style>