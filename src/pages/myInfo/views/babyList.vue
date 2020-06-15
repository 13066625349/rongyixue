<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
        <div class="baby-wrap" v-if="babyList.length>0" >
            <div class="content"  v-for="(item,index) in babyList" :key="index" @click="goMyInfo(index+1)">
                <div class="payInfo">
                    <div class="payTitle">{{item.studentName}}</div>
                    <div class="payTitle">
                        {{item.studentAge?item.studentAge+'岁':''}}
                    </div>
                    <div class="payTitle">
                        {{item.studentSex==0?'男':'女'}}
                    </div>
                </div>


            </div>
        </div>
	</div>
</template>

<script>
    import request from '../../../static/js/request';
    import result from '../../../static/js/result'
	export default {
		data() {
			return {
			    babyList:[],
			}
		},
		mounted() {

		},
		created() {
            this.getUserInfo();
            this.getInfo();
		},

		methods: {
            async getUserInfo() {
                let params = {
                    //access_token:this.$store.state.token
                }

                /*let headers = {
                    contentType:'application/x-www-form-urlencoded',
                    //token:this.$store.state.token

                }*/
                let getUserInfo = await request('/api/token/base/info/getUser?access_token=' + this.$store.state.token,
                    'get', params, 'application/x-www-form-urlencoded')
                // loading.hide()
                let info = result(getUserInfo)
                console.log('获取电话号失败信息', getUserInfo)
                // loading.hide()
                if (getUserInfo.code == 500) {
                    this.$store.commit('setPhone', '');
                    this.$router.push('/login?isMyInfo=true')
                }
                if (!info) return;
                console.log('获取电话号成功信息', getUserInfo)
                this.$store.commit('setPhone', getUserInfo.msg);
            },
            async getInfo() {
                let params = {
                    phone: this.$store.state.phone,
                    access_token: this.$store.state.token
                }
                let headers = {
                    contentType: 'application/x-www-form-urlencoded',
                    //token:this.$store.state.token

                }
                console.log(this.$store.state.token)
                let myInfo = await request('/api/token/base/info/select',
                    'post', params, 'application/x-www-form-urlencoded')
                // loading.hide()
                let res = result(myInfo)
                console.log('myInfo', myInfo)
                if (!res) return;
                this.babyList = res.baseStudent

            },
            goMyInfo(index){
                console.log('进来了')
                this.$store.commit('setBabyIndex', index);
                this.$router.go(-1)
            }
        },
        watch: {

        },
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";
	.main {
		width: 100%;
		height: 100%;
        overflow-y: scroll;
        background: #fff;
        box-sizing: border-box;
		position: relative;
		top: 0;
		left: 0;
		input::-webkit-input-placeholder {
			color: #999;
		}
        .baby-wrap{
            width: 90%;
            padding: 30rem  / @rootFontSize;
            position:absolute;
            left:50%;    /* 定位父级的50% */
            top:50%;
            transform: translate(-50%,-50%);

        }
        .content{
            margin-bottom: 30rem / @rootFontSize;
            padding: 30rem / @rootFontSize;
            display: flex;
            justify-content: space-between;
            box-shadow: 0 0 16rem/ @rootFontSize #bababa;
            border-radius: 8px;
            .payInfo{
                color: #ff842c;
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100%;
                box-sizing: border-box;
                .payTitle{
                    line-height: 36rem / @rootFontSize;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    overflow:hidden;
                }
            }

        }

	}

</style>