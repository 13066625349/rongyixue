<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
        <div class="typeTitle">
            <img src="./img/remai.png" alt="">
            <span>比赛活动</span>
        </div>
        <div class="product-wrap"  v-for="(item,index) in gameList" :key="index">
            <div class="product-item" @click="goDetail('/activitiesDetail?id='+item.id)">

                <div class="productTitle">{{item.theme}}</div>

                <div class="productPrice">{{item.activityStartTime.split(' ')[0]}}--{{item.activityEndTime.split(' ')[0]}}</div>

            </div>
        </div>
	</div>
</template>

<script>
	import request from '../../../static/js/request';
	import result from '../../../static/js/result';

	export default {
		data() {
			return {
                gameList:[]
			}
		},
		mounted() {

		},
		created() {

            this.getList();
		},
		methods: {
            goDetail(url){
                this.$router.push(url);
            },
            async getList(){
                let params = {};
                let getListInfo = await request('/api/activity/match/list',
                    'post',params,'application/x-www-form-urlencoded')
                // loading.hide()
                let res = result(getListInfo)
                console.log(res)
                // loading.hide()
                if(!res) return;
                console.log('返回结果',getListInfo)
                this.gameList = getListInfo.data;

            }
		}
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";

	.main {
		width: 100%;

        box-sizing: border-box;
		position: relative;
        overflow-y: scroll;
        padding: 0 30rem / @rootFontSize;
		top: 0;
		left: 0;
		input::-webkit-input-placeholder {
			color: #999;
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
                box-shadow: 0 0 16rem/ @rootFontSize #bababa;
                border-radius: 8px;
                width: 100%;
                height: auto;
                padding: 30rem / @rootFontSize;
                margin-bottom: 30rem / @rootFontSize;
                .small{
                    height: 290rem / @rootFontSize!important;
                }
                .productImg{
                    width: 100%;
                    height: 350rem / @rootFontSize;
                    margin-bottom: 5px;

                    img{
                        border-radius:8px 8px 0 0 ;
                        width: 100%;
                        height: 100%;
                    }
                }
                .productTitle{
                    //margin-left: 10rem / @rootFontSize!important;
                    line-height: 14px;
                    margin-bottom: 5px;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    overflow:hidden;
                }
                .productPrice{
                    //color: #ff842c;
                    //margin: 5px 0;
                    margin-top: 30rem / @rootFontSize;
                }
            }
        }

	}
</style>