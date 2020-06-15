<template>
    <div class="main">
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 用户信息 -->
        <div class="userInfo">
            <span class="marL">参赛选手信息</span>
            <div class="info">
                <div class="childName">
                    <span>学生姓名</span>
                    <input type="text" :disabled="isExpired" placeholder="请输入学生姓名" v-model="childName">
                </div>
                <div class="xian"></div>
                <!-- <div class="userName">
                    <span>家长姓名</span>
                    <input type="text" :disabled="isExpired" placeholder="请输入家长姓名" v-model="userName">
                </div>
                <div class="xian"></div>
                <div class="userPhone">
                    <span>家长手机号</span>
                    <input @change="phoneTest(userPhone)"  type="number" :disabled="isExpired" placeholder="请输入手机号" v-model="userPhone">
                </div>
                <div class="xian"></div> -->
                <div class="kindergartenName">
                    <span>幼儿园</span>
                    <span class="spanStyle">{{kindergartenName}}</span>
                </div>
                <div class="xian"></div>
                <div class="classes">
                    <span>班级</span>
                    <span class="spanStyle">{{classes}}</span>
                </div>
            </div>
        </div>
        <!--<div class="signUp" >
            <button @click="goNext()">下一步</button>
        </div>-->
        <div class="userInfo">
            <span class="marL">参赛作品信息</span>
            <div class="info">
                <div class="upVideo">
                    <span>参赛视频</span>
                    <div class="wrap">
                        <div type="primary" :class="{wrapper:true,disables:isExpired}" style="color: #fff">
                            <label class="btn" for="fileUpload">更新参赛视频</label>
                        </div>
                        <input ref="clearVideo" type="file" accept="video/*" :disabled="isExpired" id="fileUpload" style="position:absolute; clip:rect(0 0 0 0);"  @change="uploadVideo(0,$event)" >
                    </div>
                    <span class="status">
                        <img v-if="!videoUrl" src="../img/no.png" alt="">
                        <img v-if="videoUrl" src="../img/yes.png" alt="">
                    </span>
                </div>
                <!--<progress id="progress" max="100" value="0"></progress>-->
                <div class="video">
                    <span>视频预览</span>
                    <div class="viewVideo" @click="viewVideo()"><span>查看视频</span></div>
                </div>
                <div class="xian"></div>
            </div>
        </div>
        <div class="uploadImg">
            <span>主视角照片</span>
            <div class="up">
                <img :src="showImg?showImg:require('../img/addjia.png')" alt="">
                <img v-if="!isExpired" :class="{delete:true,show:isShow}" @click="deleteImg()" src="../img/delete.png" alt="">
                <form enctype="multipart/form-data">
                    <input ref="pathClear" class="upImg" :disabled="isExpired" type="file" name="image" accept="image/*" @change='upImg'>
                </form>
            </div>
        </div>
        <div class="showBigImg">
            <span>图片预览</span>
            <div class="show" @click="showBigImg()"><span>查看大图</span></div>
        </div>
        <div class="score">
            <span>此作品评分</span>
            <input @change="scoreLimit(score)" type="number" :disabled="isExpired" placeholder="请输入评分" v-model="score">
        </div>
        <div class="signUp" >
            <button :disabled="isClick" :class="{disables:isExpired?isExpired:false}" @click="!isExpired?editUp():''">修改</button>
        </div>
        <div v-if="isView" :class="{viewImg:isView}" @click="hide()">
            <img :src="showImg" alt="">
        </div>
        <div v-if="isViewVideo" :class="{watchVideo:isViewVideo}" @click="hide()">
            <video controls=""  x5-playsinline="" playsinline="" webkit-playsinline="" poster="" preload="auto" @click="hide()">
                <source :src="videoUrl" type="video/mp4" />
                <source :src="videoUrl" type="video/ogg">
            </video>
        </div>
    </div>

</template>

<script>
    import request from '../../../../static/js/request';
    import result from '../../../../static/js/result';
    import getParam from '../../../../static/js/getParam';
    import axios from 'axios'
    export default {
        data() {
            return {
                userName:'',//名字
                userPhone:'',//手机号
                childName:'',//宝宝名字
                childNum:'',
                score:'',
                showImg:'',
                videoUrl:'',
                file:'',
                isView:false,
                isViewVideo:false,
                isShow:false,
                kindergartenName:'爱儿坊',//幼儿园名字
                kindergartenId:0,//幼儿园ID
                classes:'小班',//班级名称
                baseClassID:0,//班级ID
                workInfo:{},//作品信息
                /*classesInfo:[],//班级信息数组
                kindergartenInfo:[],//幼儿园信息数组
                isChange:false,*/
                isExpired:false,
                isClick :false,

            }
        },
        mounted() {

        },
        created() {
            if(this.$route.query.isExpired=='true'){
                this.isShow = false;
                this.isExpired = true
            }

            if(this.showImg){
                this.isShow = true;
            }
            let classInfo = JSON.parse(localStorage['classesInfo'])
            console.log('信息',classInfo)
            this.kindergartenName = classInfo.kindergartenName;
            this.classes = classInfo.classes;
            this.kindergartenId = classInfo.kindergartenId;
            this.baseClassID = classInfo.baseClassID;
            this.getInfo();
            //this.getKindergarten();

        },
        methods: {
            phoneTest(phone){
                if(!(/^1[3456789]\d{9}$/.test(phone))){
                    weui.alert("请输入正确手机号");
                    this.userPhone = localStorage['oldPhone'];
                    return false;
                }
            },
            scoreLimit(score){
                if(score>100){
                    weui.alert('评分最高100分')
                    this.score = localStorage['oldScore'];
                }
                console.log(score)
            },
            /**
             * 获取幼儿园信息
             * */
            async getKindergarten(){
                let params = {

                }

                let getClassInfo = await request('/api/base/kindergarten/list',
                    'post', params, 'application/x-www-form-urlencoded')
                // loading.hide()
                let info = result(getClassInfo)
                // loading.hide()
                if(!info) return;
                console.log(info)
                if(info){
                    for(let item of info){
                        let items = {};
                        items.label = item.kindergartenName;
                        items.id = item.id;
                        this.kindergartenInfo.push(items)
                    }
                }

            },

            /**
             * 获取班级信息
             * */
            async getClass(id){
                let params = {
                    kindergartenId:id
                }
                let getClassInfo = await request('/api/base/class/list',
                    'post', params, 'application/x-www-form-urlencoded')
                // loading.hide()
                let info = result(getClassInfo)
                // loading.hide()
                if(!info) return;
                if(info){
                    for(let item of info){
                        let items = {};
                        items.label = item.className;
                        items.id = item.id;
                        items.classLevel = item.classLevel;
                        items.studentsNumber = item.studentsNumber;
                        this.classesInfo.push(items)
                    }
                }

            },


            /**
             * 选择幼儿园
             * */
            pickerSchool(){
                let _this = this;
                if(_this.kindergartenInfo.length!=0){
                    weui.picker(_this.kindergartenInfo, {
                        className: 'custom-classname',
                        container: 'body',
                        defaultValue: [],
                        onChange: function (result) {
                            console.log(result)
                            _this.kindergartenId = result[0].id;
                        },
                        onConfirm: function (result) {
                            console.log(result);
                            _this.kindergartenName = result[0].label;
                            _this.kindergartenId = result[0].id;
                            _this.classesInfo = [];
                            _this.classes = '';
                            _this.getClass(result[0].id);
                        },
                        id: 'singleLinePicker'
                    });
                }
            },
            /**
             * 选择班级
             * */
            pickerClass(){
                let _this = this;
                if(!_this.kindergartenId){
                    weui.alert('请先选择幼儿园')
                }
                console.log(this.classesInfo)
                if(this.classesInfo.length!=0){
                    weui.picker(_this.classesInfo, {
                        className: 'custom-classname',
                        container: 'body',
                        defaultValue: [],
                        onChange: function (result) {
                            console.log(result)
                        },
                        onConfirm: function (result) {
                            console.log(result[0].label);
                            _this.classes = result[0].label;
                            _this.baseClassID = result[0].id;
                        },
                        id: 'singleLinePicker'
                    });
                }

            },
            uploadVideo(start,e) {
                //e.target.value文件名
                let file = e.target.files[0];
                console.log('文件',file)
                const chunkSize = 4 * 1024 * 1024;
                let formData = new FormData();
                let fileSize = (file.size).toFixed(0);
                /*if (start >= fileSize) {
                    return;
                }
                // 获取文件块的终止字节
                let end = (start + chunkSize >fileSize) ? fileSize : (start + chunkSize);
                // 将文件切块上传
                formData.append('file',file.slice(start, end),file.name);*/
                formData.append('file', file,file.name);
                console.log('正在上传视频...')
                this.doUpload(formData,fileSize);
            },
            doUpload(formData,fileSize) {
                let that = this;
                let loading = weui.loading('loading', {
                    className: 'custom-classname'
                });
                let size = 30*1024*1024;
                if(fileSize>size){
                    loading.hide();
                    console.log('进来了')
                    weui.alert('视频大小不能超过30M');
                    return false;
                }
                axios.post('/api/base/common/common/uploadAliOss', formData).then(res => {
                    loading.hide();
                    console.log(res)
                    if (res.data.status==0) {
                        this.videoUrl = res.data.message;
                        let progress = document.getElementById('progress');
                        /* progress.max = fileObj.size;
                         progress.value = end;
                         that.uploadVideo(end);*/
                        weui.toast('上传视频成功');

                        this.$refs.clearVideo.value='';
                    } else {
                        weui.toast('上传失败');
                        this.$refs.clearVideo.value='';
                        this.videoUrl = localStorage['videoUrl']?localStorage['videoUrl']:'';
                        if(this.videoUrl == 'null'){
                            this.videoUrl = ''
                        }
                    }
                }).catch(err => {
                    loading.hide();
                    weui.toast('上传失败')
                    console.log(err);
                    this.videoUrl = localStorage['videoUrl']?localStorage['videoUrl']:'';
                    if(this.videoUrl == 'null'){
                        this.videoUrl = ''
                    }
                })
            },
            upImg (e) {

                let loading = weui.loading('loading', {
                    className: 'custom-classname'
                });

                let file = e.target.files[0];
                this.showImg = window.URL.createObjectURL(e.target.files[0]);
                this.imgPreview(file,loading);
                /*let formData = new window.FormData();
                //formData.avatarFile = file.name
                formData.append('file', file,file.name);
                //formData.append('access_token',this.$store.state.token)
                console.log(file.name)
                console.log('上传文件',formData.get('file'))
                this.showImg = window.URL.createObjectURL(e.target.files[0]);
                axios.post('/api/base/common/common/uploadAliOss', formData).then(res => {
                    loading.hide();
                    if (res.data.status==0) {
                        this.isShow = true;
                        this.showImg = res.data.message;
                        weui.toast('上传照片成功');
                        this.$refs.pathClear.value='';
                    } else {
                        weui.alert('上传失败');
                        this.showImg = localStorage['showImg'];
                    }
                }).catch(err => {
                    loading.hide();
                    weui.alert('上传失败');
                    this.showImg = localStorage['showImg'];
                    console.log(err);
                })*/
            },
            imgPreview(file, loading) {
                let that = this;
                //判断支不支持FileReader
                if (!file || !window.FileReader) return;
                if (/^image/.test(file.type)) {
                    //创建一个reader
                    let reader = new FileReader();
                    //将图片转成base64格式
                    reader.readAsDataURL(file);
                    //读取成功后的回调
                    reader.onloadend = function() {
                        let result = this.result;
                        let img = new Image();
                        img.src = result;
                        console.log("********未压缩前的图片大小********");
                        console.log(result.length);
                        img.onload = function() {
                            let data = that.compress(img);
                            that.imgUrl = result;
                            let blob = that.dataURItoBlob(data);
                            console.log("*******base64转blob对象******");
                            console.log(blob);

                            let formData = new window.FormData();
                            //formData.avatarFile = file.name
                            formData.append('file', file,file.name);
                            //formData.append('access_token',this.$store.state.token)
                            console.log(file.name)
                            console.log('上传文件',formData.get('file'))
                            //this.showImg = window.URL.createObjectURL(e.target.files[0]);
                            axios.post('/api/base/common/common/uploadAliOss', formData).then(res => {
                                loading.hide();
                                if (res.data.status==0) {
                                    that.isShow = true;
                                    that.showImg = res.data.message;
                                    weui.toast('上传照片成功');
                                    that.$refs.pathClear.value='';
                                } else {
                                    weui.toast('上传失败');
                                    that.showImg = '';
                                    that.$refs.pathClear.value='';
                                    return false;
                                }
                            }).catch(err => {
                                loading.hide();
                                weui.toast('上传失败');
                                that.showImg = '';
                                that.$refs.pathClear.value='';
                                console.log(err);
                            })

                        };
                    };
                }
            },
            deleteImg(){
                this.isShow = false;
                this.showImg = '';
            },
            showBigImg(){
                if(this.showImg == ''){
                    weui.alert('请先上传图片');
                    return false;
                }
                this.isView = true;
                /*let gallery = weui.gallery(this.showImg, {
                    className: 'showBigImg',
                    onDelete: function(){
                        weui.confirm('确定删除该图片？', function(){
                            _this.$nextTick(()=>{

                                this.showImg = '';
                                this.isShow = false;
                                let showBigImg = document.getElementsByClassName('showBigImg')[0]
                                showBigImg.className="hide";
                                console.log(this.showImg)
                            })}, function(){
                            console.log('no') });

                    }
                });*/
            },
            viewVideo(){
                console.log('视频',this.videoUrl)
                if(this.videoUrl == ''){
                    weui.alert('请先上传视频');
                    return false;
                }
                this.isViewVideo = true;
            },
            hide(){
                this.isView = false;
                this.isViewVideo = false;
            },
            // 压缩图片
            compress(img) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                canvas.width = width;
                canvas.height = height;
                // 铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);

                //进行最小压缩
                let ndata = canvas.toDataURL("image/jpeg", 0.1);
                // console.log("*******压缩后的图片大小*******");
                // console.log(ndata)
                // console.log(ndata.length);
                return ndata;
            },
            // base64转成bolb对象
            dataURItoBlob(base64Data) {
                let byteString;
                if (base64Data.split(",")[0].indexOf("base64") >= 0)
                    byteString = atob(base64Data.split(",")[1]);
                else byteString = unescape(base64Data.split(",")[1]);
                let mimeString = base64Data
                    .split(",")[0]
                    .split(":")[1]
                    .split(";")[0];
                let ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ia], { type: mimeString });
            },
            /**
             * 上传信息
             * */
            async editUp(){
                if(this.childName == ''){
                    weui.alert('请填写学生姓名');
                    return false;
                }
                let params = {
                    id:this.$route.query.studentId,
                    studentName:this.childName,
                    access_token:this.$store.state.expertToken
                }
                let editStudent = await request('/api/token/base/student/edit',
                    'post', params, 'application/x-www-form-urlencoded');
                // loading.hide()
                let res = result(editStudent);
                // loading.hide()
                if(!res) return;

                if(this.videoUrl == ''){
                    weui.alert('请上传视频');
                    return false;
                }
                if(this.showImg == ''){
                    weui.alert('请上传主视角照片');
                    return false;
                }
                if(!this.score){
                    weui.alert('请填写该作品评分');
                    return false;
                }
                let params1 = {
                    studentName:this.childName,
                    id:this.$route.query.id,
                    studentId:this.$route.query.studentId,
                    workUnderlineScore:this.score,
                    activityImgUrl:this.showImg,
                    activityVideoUrl:this.videoUrl,
                    access_token : this.$store.state.expertToken
                }
                let uploadInfo = await request('/api/token/activity/member/edit',
                    'post', params1, 'application/x-www-form-urlencoded')
                // loading.hide()
                let info = result(uploadInfo)
                // loading.hide()
                if(!info) return;
                console.log('上传结果',info);
                this.isClick = true;
                weui.alert('修改成功')
                this.$router.go(-1);
            },
            /**
             * 获取信息
             * */
            async getInfo(){
                /*let loading = weui.loading('loading', {
                    className: 'custom-classname'
                });*/
                let params  = {
                    access_token:this.$store.state.expertToken,
                    studentId:this.$route.query.studentId,
                    studentKindergartenId:this.kindergartenId,
                    studentClassId : this.baseClassID,
                    activityId:this.$route.query.activityId
                }

                let getWorkInfo = await request('/api/token/activity/member/list',
                    'post',params,'application/x-www-form-urlencoded')
                 //loading.hide()
                let info = result(getWorkInfo)
                if(!info) return;
                console.log('作品信息',info)
                for(let item of info ){
                    if(item.studentId == this.$route.query.studentId){
                        this.workInfo = item;
                        //this.userName = item.baseMemberInfo.name;
                        //this.userPhone = item.baseMemberInfo.phone;
                        this.childName = item.studentName;
                        this.showImg = item.activityImgUrl;
                        this.videoUrl = item.activityVideoUrl;
                        if(this.videoUrl == 'null'){
                            console.log('没进来没进来',this.videoUrl)
                            this.videoUrl = ''
                        }
                        if(this.showImg == 'null'){
                            this.showImg = ''
                            this.isShow = false;
                            console.log('进来了进来了',this.showImg,this.isShow)
                        }
                        localStorage['showImg'] = item.activityImgUrl;
                        localStorage['videoUrl'] = item.activityVideoUrl;
                        this.score = item.workUnderlineScore;
                        localStorage['oldScore'] = item.workUnderlineScore;
                        //localStorage['oldPhone'] = item.baseMemberInfo.phone;
                    }
                }
                this.$nextTick(()=>{
                    if(this.showImg){
                        this.isShow = true;
                    }
                })



            },
            /* async goNext(){
                 if(this.childName == ''){
                     weui.alert('请填写学生姓名');
                     return false;
                 }
                 if(this.userName == ''){
                     weui.alert('请填写家长姓名');
                     return false;
                 }
                 if(this.userPhone == ''){
                     weui.alert('请填写家长手机号');
                     return false;
                 }
                 let params = {
                     name:this.userName,
                     phone:this.userPhone,
                     nickName :this.childName,
                     kindergartenId:this.kindergartenId,
                     baseClassID:this.baseClassID
                 }
                 let regInfo = await request('/api/base/info/addUser',
                     'post', params, 'application/x-www-form-urlencoded');
                 // loading.hide()
                 let res = result(regInfo);

                 // loading.hide()
                 if(!res) return;
                 console.log('信息',regInfo);
                 this.$router.push('/uploadNext1?activityMember='+this.$route.query.activityMember+'&showImg='+this.showImg+'&videoUrl='+this.videoUrl+'&score='+this.score+'&id='+this.$route.query.id+'&isExpired='+this.$route.query.isExpired)

             },*/


        }
    }
</script>

<style lang="less" scoped>
    @import "~static/css/minxin.less";
    .main {
        z-index: 99;
        /*overflow-y: scroll;*/
        height: 100%;
        width: 100%;
        background: #f3f3f3;
        input::-webkit-input-placeholder {
            color: #999;
        }
        .status{
            width: 20%!important;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                position: static!important;
            }
        }
        .showBigImg{
            padding: 30rem / @rootFontSize;
            background: #fff;
            display: flex;
            justify-content: space-between;
            .font-dpr(14px);
            color: #959595;
            border-bottom: 1px solid #999;
            span{
                display: block;
                //padding: 0 30rem / @rootFontSize;
                height: 100%;
            }
        }
        .userInfo{
            padding-top: 30rem / @rootFontSize;
            width: 100%;
            height: auto;
            span{
                .font-dpr(14px);
                color: #959595;
            }
            .marL{
                margin-left:20rem / @rootFontSize;
            }
            .userName{
                //margin-top: 40rem / @rootFontSize;
            }
            .info{
                padding-left: 20rem / @rootFontSize;
                box-sizing: border-box;
                background: #fff;
                div{
                    span{
                        line-height: 80rem / @rootFontSize;
                        color: #999;
                        width: 30%;
                    }
                    display: flex;
                    width: 100%;
                    height: 80rem / @rootFontSize;
                    margin-bottom: 10rem / @rootFontSize;
                    //border-bottom: 1px solid #999;
                    position: relative;
                    input{
                        color: #999;
                    }
                    input.colorStyle{
                        //color: #000;
                        background: #fff;
                    }
                    img{
                        position: absolute;
                        left: 25rem / @rootFontSize;
                        top: 25rem / @rootFontSize;
                        width: 50rem / @rootFontSize;
                        height: 50rem / @rootFontSize;
                    }
                    .viewVideo{
                        width: 70%;
                        height: 100%;
                        border: none;
                        padding-left: 100rem / @rootFontSize;
                        box-sizing: border-box;
                        .font-dpr(14px);
                        line-height: 80rem / @rootFontSize;
                        color: #999;
                    }
                    input{
                        width: 70%;
                        height: 100%;
                        border: none;
                        padding-left: 100rem / @rootFontSize;
                        box-sizing: border-box;
                        .font-dpr(14px);
                    }
                }
                .xian{
                    width: 100%;
                    height: 1px!important;
                    background: #999;
                }
                img{
                    width: 100%;
                }
            }

        }
        .uploadImg{
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #999;
            .font-dpr(14px);
            padding: 0 30rem / @rootFontSize;
            .up{
                width: 200rem / @rootFontSize;
                height: 200rem / @rootFontSize;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                }
                form{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    input{
                        width: 100%;
                        height: 100%;
                        z-index: 100;
                        position: absolute;
                        top: 0;
                        left: 0;
                        opacity: 0;
                    }
                }
                .show{
                    display: block!important;
                }
                .delete{
                    display: none;
                    width: 50rem / @rootFontSize;
                    height: 50rem / @rootFontSize;
                    z-index: 101;
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }

        }
        .score{
            //border-bottom: 1px solid #999;
            span{
                line-height: 80rem / @rootFontSize;
                color: #999;
                width: 30%;
                .font-dpr(14px);
                background: #fff;
                padding-left: 20rem / @rootFontSize;
            }
            display: flex;
            width: 100%;
            height: 80rem / @rootFontSize;
            margin-bottom: 10rem / @rootFontSize;
            //border-bottom: 1px solid #999;
            position: relative;
            input{
                color: #999;
            }
            input.colorStyle{
                //color: #000;
                background: #fff;
            }
            input{
                color: #999;
                width: 70%;
                height: 100%;
                border: none;
                padding-left: 100rem / @rootFontSize;
                box-sizing: border-box;
                .font-dpr(14px);
            }
        }
        .signUp{
            text-align: center;
            width: 100%%;
            height: 80rem / @rootFontSize;
            button{
                margin-top: 10rem / @rootFontSize;
                margin-bottom:  10rem / @rootFontSize;
                width: 80%;
                height: 100%;
                border-radius: 30px;
                border: none;
                //background: #ff6100;
                background: skyblue;
                color: #fff;
                box-sizing: border-box;
                text-align: center;
                line-height: 50%;
                .font-dpr(16px);
            }
        }
        .spanStyle{
            width: 70% !important;
            height: 100%;
            display: block;
            padding-left: 100rem / @rootFontSize;
            line-height: 90rem / @rootFontSize;
            color:#999;
            border-radius: 20px;
            border: none;
            padding-left: 100rem / @rootFontSize;
            box-sizing: border-box;
            .font-dpr(14px);
        }
        .topShow1{
            margin-top: 300rem / @rootFontSize;
        }
        input.file{
            position: relative;
            -moz-opacity:0 ;
            //filter:alpha(opacity: 0);
            opacity: 0;
            z-index: 2;
        }
        .wrap{
            display: flex;
            align-items: center;
            width: 80%;
            box-sizing: border-box;
            padding-left: 100rem / @rootFontSize;
            .wrapper{
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #31b0d5;
                border-color: #269abc;
                //margin-bottom: 0;
                font-size: 14px;
                font-weight: 400;
                cursor: pointer;
                border: 1px solid transparent;
                border-radius: 4px;

            }
        }
        .viewImg{
            z-index: 999;
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 100%;
                height: 50%;
            }
        }
        .watchVideo{
            z-index: 999;
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            video{
                width: 100%;
                height: 50%;
            }
        }

    }
</style>