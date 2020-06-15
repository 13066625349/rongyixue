<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 交费详情 -->
        <div >交费详情</div>
	</div>
</template>

<script>
	import request1 from '../../../../static/js/request1'
	import result from '../../../../static/js/result'
	import getParam from '../../../../static/js/getParam'
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		created() {

			let payInfo = this.$route.query.payInfo;
			payInfo = decodeURI(payInfo);
			payInfo = JSON.parse(payInfo);
			console.log('传过来的未支付的信息',payInfo)
		},
		methods: {



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
        .content{
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
                color: #ff842c;
                span{
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
	}
</style>