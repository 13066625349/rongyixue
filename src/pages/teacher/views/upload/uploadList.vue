<template>
    <div class="main">
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 视频列表 -->
        <div class="topWrap">
            <div :class="{add:true,disables:isExpired}" @click="!isExpired?goDetail('/upload?activityId='+$route.query.id):''">添加</div>
        </div>
        <!--<div class="recode-wrap" v-for="(item,index) in payList" :key="index" >
            <div class="content" >
                <div class="img">
                    <div class="img-wrap">
                        <img src="../img/head.png" alt="">
                    </div>
                </div>
                <div class="payInfo">
                    <div class="payTitle">{{item.goodsSpu.goodsName}}</div>
                    <div class="payClassHour"></div>

                    <div v-show="item.actualPayment==null" class="payTime">{{item.orderTime}}</div>
                    <div v-show="item.actualPayment" class="payTime">{{item.payTime}}</div>
                </div>
                <div class="payPrice">
                    ￥{{item.goodsTotal/100}}
                    <span v-show="item.actualPayment==null">未支付</span>
                    <span  v-show="item.actualPayment">已支付</span>
                </div>
            </div>
        </div>-->
        <span class="mainTitle">学生视频上传列表</span>
        <div class="recode-wrap" >
            <div class="content" @click="goDetail('/uploadDetail?studentId='+item.studentId+'&id='+item.id+'&isExpired='+isExpired+'&activityId='+$route.query.id)" v-for="(item,index) in memberList" :key="index">
                <div class="img">
                    <div class="img-wrap">
                        <img :src="item.activityImgUrl" alt="">
                    </div>
                </div>
                <div class="payInfo">
                    <div class="payTitle">{{item.studentName}}</div>
                    <div class="payClassHour"></div>
                    <div>{{item.createTime}}</div>
                </div>
                <div class="payPrice">
                    老师评分
                    <span>{{item.workUnderlineScore}}分</span>

                </div>
            </div>
        </div>
        <div class="empty" v-if="memberList.length==0">
            <img src="../img/empty.png" alt="">
            <span>暂无上传学生视频</span>
        </div>

    </div>
</template>

<script>
    import request from '../../../../static/js/request'
    import result from '../../../../static/js/result'
    export default {
        data() {
            return {
                memberList:[],
                endTime:this.$route.query.endTime?this.$route.query.endTime:'',
                isExpired:false,
                kindergartenId:0,
                baseClassID:0,
            }
        },
        mounted() {

        },
        created() {
            /*this.getUserInfo();
            this.getInfo();*/
            let classInfo = JSON.parse(localStorage['classesInfo'])
            this.kindergartenId = classInfo.kindergartenId;
            this.baseClassID = classInfo.baseClassID;
            console.log('活动结束时间',this.endTime)
            this.getList();
            this.getNowDate();

        },
        methods: {
            async getList(){
                let loading = weui.loading('loading', {
                    className: 'custom-classname'
                });
                let params = {
                    studentKindergartenId:this.kindergartenId,
                    studentClassId:this.baseClassID,
                    access_token:this.$store.state.expertToken,
                };
                console.log(params);
                /*let headers = {
                    contentType:'application/x-www-form-urlencoded',
                    token:this.$store.state.token
                };*/
                //console.log(this.$store.state.token);
                let listInfo = await request('/api/token/activity/member/list',
                    'post', params,'application/x-www-form-urlencoded');
                // loading.hide()
                let res = result(listInfo);
                 loading.hide()
                if(!res) return;
                console.log(res)
                for(let item of res){
                    this.memberList.push(item);
                    /*if(item.baseMemberInfo.kindergartenId==this.$route.query.kindergartenId){
                        if(item.baseMemberInfo.baseClassID ==this.$route.query.baseClassID){
                            if(item.activityId == this.$route.query.activityId){
                                this.memberList.push(item);
                            }
                        }
                    }*/
                }

            },
            goDetail(url){
                this.$router.push(url);
            },
            getNowDate(){
                let date = new Date();
                let seperator1 = "-";
                let seperator2 = ":";
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                let hours = date.getHours(); //获取当前小时数(0-23)
                let minutes = date.getMinutes(); //获取当前分钟数(0-59)
                let seconds = date.getSeconds(); //获取当前秒数(0-59)
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                let nowDate = date.getFullYear() + seperator1 + month + seperator1 + strDate +' '+ hours + seperator2 + minutes + seperator2 + seconds;
                console.log(nowDate)
                let endDate = new Date(this.endTime);
                // 有三种方式获取
                let nowDate1 = new Date(nowDate);
                let time1 = endDate.getTime();
                let time2 = nowDate1.getTime();
                if((Number(time2)-Number(time1))>0){
                    console.log('过期')
                    this.isExpired = true;
                    weui.toast('比赛已过期')
                }
                console.log(time1,time2);


            }
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
        padding: 30rem / @rootFontSize;
        top: 0;
        left: 0;
        input::-webkit-input-placeholder {
            color: #999;
        }
        .mainTitle{
            color: #999;
        }
        .topWrap{
            width: 100%;
            margin-bottom: 30rem / @rootFontSize;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .add{
                background: skyblue;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 60rem / @rootFontSize;
                height: 60rem / @rootFontSize;
                border-radius: 20px;
            }
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
        .empty{
            position:absolute;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 40%;
            text-align: center;
            img{
                width: 100%;
                height: 100%;
            }
            span{

                color: #999;
            }
        }
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
        .disables{
            background: #bababa!important;
        }
    }
</style>