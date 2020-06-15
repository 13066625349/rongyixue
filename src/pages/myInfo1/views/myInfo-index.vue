<template>
    <div class="main">

        <div v-wechat-title="$route.meta.title"></div>
        <!--本页不是用户信息页，而为支付完成后的跳转页面-->
        <div v-if="status">
            <div class="pay" >
                支付成功
            </div>
            <div class="msg" @click="back()" >
                <span>点击退出快快去学习吧</span>
            </div>
        </div>
        <div v-if="!status">
            <div class="pay" >
                支付失败
            </div>
            <div class="msg" @click="back()" >
                <span>点击退出请重新扫码支付</span>
            </div>
        </div>
        <div class="img">
            <img src="./img/pay.png" alt="">
        </div>
    </div>
</template>

<script>
    import getParam from '../../../static/js/getParam'
    export default {
        data() {
            return {
                status:getParam('status')?getParam('status'):false,
            }
        },
        mounted() {

        },
        created() {
            sessionStorage['isShow'] = true;
        },
        methods: {
            back(){
                console.log('退出')
                window.history.go(-1)
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
        top: 0;
        left: 0;
        input::-webkit-input-placeholder {
            color: #999;
        }
        .msg{
            width: 100%;
            text-align: center;
            margin-top: 100rem / @rootFontSize;
            height: 80rem / @rootFontSize;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                line-height: 80rem / @rootFontSize;
                display: block;
                width: 60%;
                height: 100%;
                background: skyblue;

                border-radius: 20px;
                color: #fff;
                margin-bottom: 20rem / @rootFontSize;
            }

        }
        .pay{
            width: 100%;
            margin-top: 100rem / @rootFontSize;

            text-align: center;
            .font-dpr(30px);
            color: #007aff;
        }
        .img{
            position:absolute;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 60%;
            img{
                width: 100%;
                height: 100%;
            }
        }

    }

</style>