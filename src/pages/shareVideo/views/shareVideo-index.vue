<template>
    <div class="main">
        <div v-wechat-title="$route.meta.title"></div>
        <!--<div v-if="!isShow" :class="{videoWrap:true}">
            <img src="../../img/video1.png" alt="" @click="showVideo()">
        </div>-->
        <div v-if="isShow" :class="{videoWrap:true,colorStyle:isShow}" @click="hide()">
            <!--<video  controls
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
            </video>-->
            <video controls=""  x5-playsinline="" playsinline="" webkit-playsinline="" poster="" preload="auto" @click="hide()">
                <source :src="videoUrl" type="video/mp4" />
                <source :src="videoUrl" type="video/ogg">
            </video>
        </div>
        <div class="tip">
            <span>点击右上角三个点可分享链接给好友观看宝宝参赛视频</span>
        </div>

    </div>


</template>

<script>
    import getParam from '../../../static/js/getParam.js'
    export default {
        data(){
            return{
                isShow:true,
                videoUrl:getParam('videoUrl')?getParam('videoUrl'):''
            }
        },
        created(){
            console.log(getParam('videoUrl'))
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            showVideo(){
                //window.open(this.videoUrl)
                this.isShow=true;

            },
            hide(){
                console.log(1)
                this.$router.go(-1)
                //this.isShow=false;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "~static/css/minxin.less";
    .main{
        width: 100%;
        height: 100%;
        position: relative;
        //background: #000;
        .videoWrap{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            video{
                width: 100%;
                height: 50%;
            }
            img{
                width: 80%;
                height: 50%;
            }
        }
        .tip{
            position: fixed;
            left: 0;
            bottom: 40rem / @rootFontSize;
            z-index: 111;
            width: 100%;
            color: #007aff;
            display: flex;
            justify-content: center;
            align-items: center;
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
        .colorStyle{
            background: #000;
        }
    }

</style>