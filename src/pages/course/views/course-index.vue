<template>
        <div class="main1" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
            <div class="searchbox">
                <img class="ico-search" src="./img/ico-search.png">
                <input class="search-input" placeholder="搜索" v-model="keyword" @keyup.enter="search()">
            </div>
            <div class="data-list"> 
                <div class="nodata" v-if="dataList.length <= 0 && isLoadingEnd">
					<div class="imgDiv">
						<img src="./img/wuneirong.png">
					</div>
					<div class="noText">暂无数据</div>
				</div>               
                <div class="data-item" v-else v-for="(item,index) in dataList" :key="index" @click="goDetail('/courseDetail?id='+item.id)">
                    <img v-if="item.attachment"  class="data-pic"  :src="item.attachment" alt="">
                    <img v-else   class="data-pic"  src="./img/icon_empty_1.png" alt="">
                    <!-- <img class="data-pic" :src="item.goodsImgs" alt=""> -->
                    <div class="data-title">                        
                        <h2 class="data-t-text"><span class="data-t-tag">名师</span>{{item.goodsName}}</h2>
                        <p class="data-des">授课：{{item.professor}}</p>
                    </div>                   
                </div>
            </div>
             <div class="pullmore" v-if="dataList.length < total && isLoadingEnd" >
                上拉加载更多数据
            </div>
            <div class="pullmore" v-if="dataList.length >= total && isLoadingEnd && total>0">
                没有更多数据了
            </div>

        </div>
</template>

<script>
	import request from '../../../static/js/request';
    import result from '../../../static/js/result';

	export default {
		data() {
			return {
                isLoadingEnd:false,
                keyword:'',
                dataList:[],
                pageSize:10,
                pageNum:0,
                busy: false,
                isBottom: false,
                total:0,
			}
		},
		mounted() {

		},
		created() {
            this.isLoadingEnd = false;
            // this.getDataList('');
		},
		methods: {
            search(){
               var keyword = this.keyword;
               this.dataList=[];
               this.total = 0;
               this.getDataList(keyword);
            },
            goDetail(url){
                this.$router.push(url);
            },
            loadMore() {
                this.busy = true;
                this.pageNum= this.pageNum+1;
                this.getDataList(this.keyword);                    
                
            },
            async getDataList(keyword){
                let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
               
                let params = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    goodsName: keyword,
                };
                const getListInfo = await request('/api/goods/goodsHigh/list',
                    'post',params,'application/x-www-form-urlencoded')                
                let res = result(getListInfo);
                this.isLoadingEnd = true;              
                loading.hide();
                if(!res) return;
                if(getListInfo.code == 0) {
                    this.dataList = this.dataList.concat(getListInfo.rows);
                    this.total = getListInfo.total;
                    if(this.dataList.length < this.total){
                        this.busy = false;
                    }
                    else{
                        this.busy = true;
                    }
                }

            },
           
		}
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";

	.main1 {
        width: 100%;   
        height: 100%;     
        box-sizing: border-box;
		position: relative;
        // overflow-y: scroll;
        padding: 0 20rem / @rootFontSize;
		top: 0;
        left: 0;
        background: #f9f9f9;
        overflow-y: auto;
        /*适应苹果*/
        -webkit-overflow-scrolling: touch;
		input::-webkit-input-placeholder {
			color: #999;
        }
        .pullmore{
            width:100%;
            height: 50px;
            text-align: center;
            color:#999;
            line-height: 50px;
        }
        .searchbox{
            // width: 100%;
            height: 100rem/@rootFontSize;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 20rem/@rootFontSize 20rem/@rootFontSize;
            box-sizing: border-box;
            background: #fff;
            z-index: 9999;
            .ico-search{
                width: 30rem/@rootFontSize;
                height: 30rem/@rootFontSize;
                position: absolute;
                top: 36rem/@rootFontSize;
                left: 40rem/@rootFontSize;
            }
            input{
                width: 100%;
                height: 60rem/@rootFontSize;
                line-height: 60rem/@rootFontSize;
                font-size: 14px;
                text-align: left;
                border:none;
                outline: none;
                background: #f7f7f7;
                border-radius: 50rem/@rootFontSize;
                padding:0  30rem/@rootFontSize 0 60rem/@rootFontSize;
                box-sizing: border-box;
            }
        }
        .data-list{
            width: 100%;
            margin-top: 120rem/@rootFontSize;
            box-sizing: border-box;
            overflow: scroll;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
			-webkit-overflow-scrolling: touch;
            .data-item{
                width: 48%;
                height: 345rem/@rootFontSize;
                background: #fff;
                margin-top: 30rem/@rootFontSize;
                margin-bottom: 10rem/@rootFontSize;
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
                    padding:0 20rem/@rootFontSize;
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
                        // margin:0 10rem/@rootFontSize;
                        margin-top: 10rem/@rootFontSize;
                        font-size: 26rem/@rootFontSize;
                    }
                }
            }            
            .data-item:first-child{
                margin-top: 0;
            }
            .data-item:nth-child(2){
                margin-top: 0;
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
        .nodata {
				position: absolute;
				left: 50%;
				top: calc(50% - 80rem/@rootFontSize);
				transform: translate(-50%, -50%);
				.imgDiv {
					width: 300rem/@rootFontSize;
					height: 300rem/@rootFontSize;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.noText {
					.font-dpr(14px);
					color: #999;
					line-height: 80rem/@rootFontSize;
					text-align: center;
				}
		}
	}
</style>