<template>
    <div class="main2">
        <div class="content">
           <div class="cou-list">
               <div class="cou-row">
                    <p class="class-num">第1讲</p>
                    <p class="class-name">《滥竽充数》：用“故事”打开文章内容</p>
                    <p class="class-tag">
                        <span class="class-tag-btn red">视频</span>
                    </p>
               </div>
                <div class="cou-row">
                    <p class="class-num">第2讲</p>
                    <p class="class-name">《滥竽充数》：用“故事”打开文章内容</p>
                    <p class="class-tag">
                        <span class="class-tag-btn org">PPT</span>
                    </p>
               </div>
                <div class="cou-row">
                    <p class="class-num">第3讲</p>
                    <p class="class-name">《滥竽充数》：用“故事”打开文章内容</p>
                    <p class="class-tag">
                        <span class="class-tag-btn darkblue">图片</span>
                    </p>
               </div>
                <div class="cou-row">
                    <p class="class-num">第4讲</p>
                    <p class="class-name">《滥竽充数》：用“故事”打开文章内容</p>
                    <p class="class-tag">
                        <span class="class-tag-btn blue">PPT</span>
                    </p>
               </div>
                <div class="cou-row">
                    <p class="class-num">第5讲</p>
                    <p class="class-name">《滥竽充数》：用“故事”打开文章内容</p>
                    <p class="class-tag">
                        <span class="class-tag-btn red">视频</span>
                    </p>
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
                isLoadingEnd:false,
                keyword:'',
                dataList:[],
                pageSize:10,
                pageNum:0,
                busy: false
			}
		},
		mounted() {

		},
		created() {            
            this.isLoadingEnd = false;
            // this.getDataList('');
		},
		methods: {
		   async getDataList(keyword){
                let loading = weui.loading('loading', {
					className: 'custom-classname'
				});
               
                let params = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    orderByColumn: '',
                    isAsc: 'asc',
                    goodsName: keyword,
                };
                const getListInfo = await request('/api/goods/goodsHigh/list',
                    'post',params,'application/x-www-form-urlencoded')                
                let res = result(getListInfo);
                this.isLoadingEnd = true;              
                loading.hide();
                this.busy = true;
                if(!res) return;
                if(getListInfo.code == 0) {
                    this.dataList = getListInfo.data;
                    // if(this.dataList.length <= getListInfo.data.length) {
                    //     this.busy = true;
                    // }
                    // else{
                    //     this.busy = false;
                    // }
                }

            },
		}
	}
</script>

<style lang="less" >
	@import "~static/css/minxin.less";
    .main2{
        width: 100%;        
        box-sizing: border-box;
		position: relative;
        overflow-y: scroll;
		top: 0;
        left: 0;
        background: #fcfcff;
        .cou-list{
            width: 100%;
            padding: 20rem/@rootFontSize;
            box-sizing: border-box;
            .cou-row{
                width: 100%;
                height: 100rem/@rootFontSize;
                line-height: 50rem/@rootFontSize;
                margin-bottom: 40rem/@rootFontSize;
                .class-num{
                        width: 15%;
                        height: 100%;
                        line-height: 100rem/@rootFontSize;
                        display: block;
                        float: left;
                        font-size: 28rem/@rootFontSize;
                        color: #999;
                        overflow: hidden;
                    }
                    .class-name{
                         width: 70%;
                        height: 100%;
                        display: block;
                        float: left;
                        font-size: 32rem/@rootFontSize;
                        color: #333;
                        overflow: hidden;;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        height:  100rem/@rootFontSize;
                        line-height:  50rem/@rootFontSize;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .class-tag{
                         width: 15%;
                        height: 100%;
                        display: block;
                        float: left;   
                        text-align: right;                    
                        .class-tag-btn{
                            display: inline-block;
                            font-size: 24rem/@rootFontSize;
                            overflow: hidden;
                            margin-top: 25rem/@rootFontSize;
                            border: 1px solid #ddd;
                            padding: 0 20rem/@rootFontSize;
                            border-radius: 10rem/@rootFontSize;
                            line-height: 45rem/@rootFontSize;
                            // height: 42rem/@rootFontSize;
                        }
                        .class-tag-btn.red{
                            border: 1px solid #ff5d4f;
                            color: #ff5d4f;
                        }
                        .class-tag-btn.org{
                            border: 1px solid #ff914f;
                            color: #ff914f;
                        }
                        .class-tag-btn.darkblue{
                            border: 1px solid #644fff;
                            color: #644fff;
                        }
                        .class-tag-btn.blue{
                            border: 1px solid #4fffb7;
                            color: #4fffb7;
                        }
                    }
            }
        }
    }
</style>