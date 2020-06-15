<template>
    <div class="main">
        <router-view/>
    </div>
</template>
<script>
    import root from './views/activities-index'
    export default {
        components:{
            root
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
