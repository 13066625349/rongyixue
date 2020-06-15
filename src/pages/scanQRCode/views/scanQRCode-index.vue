<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
	</div>
</template>

<script>
	import request from '../../../static/js/request'
	import result from '../../../static/js/result'
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		created() {

			let url = location.href;
			/*wxReady(encodeURIComponent(url.split('#')[0]), jsAPIArr, () => {
				store.commit('setJSSDKstatus');
				next()
			}, () => {})*/
			this.scan();
		},
		methods: {
			scan(){

				wx.scanQRCode({
					needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function (res) {
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";

</style>