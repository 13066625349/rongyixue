<template>
    <div class="main">
        <router-view/>
    </div>
</template>
<script>
    import root from './views/register-index'
    export default {
        components:{
            root
        },
        mounted() {
            // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
            /*window.onbeforeunload = function (e) {
                let storage = window.localStorage['isShow'];
                storage.clear()
            }*/
        }
    }
</script>
<style lang="less">
    @import "~static/css/minxin.less";
    .main {
        width: 100%;
        height: 100%;
    }
</style>
