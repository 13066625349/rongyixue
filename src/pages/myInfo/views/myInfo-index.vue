<template>
    <div class="main">
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 用户信息 -->
        <div class="top">
            <div class="topContent">
                <div class="headImg">
                    <div class="quan">
                        <img :src="headSculpture" alt="">
                        <!--<img src="./img/head.png" alt="">-->
                    </div>
                </div>
                <div class="name">
                    {{userName}}
                </div>
                <div class="phoneNumber">
                    <span>{{phone}}</span>
                    <img src="./img/edit.png" alt="" @click="editInfo()">
                </div>
            </div>
        </div>
        <div class="userInfo">
            <div class="userName">
                <div class="left">
                    <img src="./img/username.png" alt="">
                    <span>家长姓名</span>
                </div>
                <div class="right" >

                    <span>{{userName}}</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="password">
                <div class="left">
                    <img src="./img/password.png" alt="">
                    <span>密码</span>
                </div>
                <div class="right" @click="editPassword()">
                    <span>点击修改密码</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="password">
                <div class="left">
                    <img src="./img/work.png" alt="">
                    <span>近期活动</span>
                </div>
                <div class="right" @click="work()">
                    <span>点击查看近期活动</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="password">
                <div class="left">
                    <img src="./img/record.png" alt="">
                    <span>交费记录</span>
                </div>
                <div class="right" @click="payRecord()">
                    <span>点击查看交费记录</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="babyName">
                <div class="left">
                    <img src="./img/check.png" alt="">
                    <span>选择宝宝</span>
                </div>
                <div class="right" >
                    <span @click="checkBaby()">点击选择宝宝</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="babyName">
                <div class="left">
                    <img src="./img/babyname.png" alt="">
                    <span>宝宝姓名</span>
                </div>
                <div class="right" >
                    <span>{{babyName}}</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="sex" >
                <div class="left">
                    <img src="./img/sex.png" alt="">
                    <span>宝宝性别</span>
                </div>
                <div class="right" >
                    <span>{{sex}}</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="birthday" >
                <div class="left">
                    <img src="./img/birthday.png" alt="">
                    <span>宝宝出生日期</span>
                </div>
                <div class="right" >
                    <span>{{birthday}}</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="schoolName">
                <div class="left">
                    <img src="./img/schoolname.png" alt="">
                    <span>幼儿园名称</span>
                </div>
                <div class="right">
                    <span>{{kindergartenName}}</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="classes" >
                <div class="left">
                    <img src="./img/classes.png" alt="">
                    <span>班级</span>
                </div>
                <div class="right" >
                    <span>{{classes}}</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="address">
                <div class="left">
                    <img src="./img/address.png" alt="">
                    <span>地址</span>
                </div>
                <div class="right" >
                    <span>{{address}}</span>
                    <img src="./img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="edit">
                <button class="btn" @click="writeOff()">注销</button>
            </div>
        </div>

    </div>
</template>

<script>
    import request from '../../../static/js/request';
    import request1 from '../../../static/js/request1';//header中有token值请求
    import result from '../../../static/js/result'
    export default {
        data() {
            return {
                headSculpture:'',
                phone:'',
                password:'',
                isShow:false,
                userName:'',
                babyName:'',
                memberID:0,
                kindergartenName:'',
                classes:'',
                studentId:0,
                birthday:'',//出生日期
                sex:'',//性别
                sexId:'',
                kindergartenId:0,//幼儿园ID
                classes:'',//班级名称
                baseClassID:0,//班级ID
                classesInfo:[],//班级信息数组
                kindergartenInfo:[],//幼儿园信息数组
                address:'',//地址
                classLevel:0,
                babyIndex:localStorage['babyIndex']?localStorage['babyIndex']:0
            }
        },
        mounted() {

        },
        created() {
            this.getUserInfo();
            this.getInfo();
        },

        methods: {
            async getUserInfo(){
                let params  = {
                    //access_token:this.$store.state.token
                }

                /*let headers = {
                    contentType:'application/x-www-form-urlencoded',
                    //token:this.$store.state.token

                }*/
                let getUserInfo = await request('/api/token/base/info/getUser?access_token='+this.$store.state.token,
                    'get',params,'application/x-www-form-urlencoded')
                // loading.hide()
                let info = result(getUserInfo)
                console.log('获取电话号失败信息',getUserInfo)
                // loading.hide()
                if(getUserInfo.code == 500){
                    this.$store.commit('setPhone', '');
                    this.$router.push('/login?isMyInfo=true')
                }
                if(!info) return;
                console.log('获取电话号成功信息',getUserInfo)
                this.$store.commit('setPhone', getUserInfo.msg);
            },
            async getInfo(){
                let params = {
                    phone:this.$store.state.phone,
                    access_token: this.$store.state.token
                }
                let headers = {
                    contentType:'application/x-www-form-urlencoded',
                    //token:this.$store.state.token

                }
                console.log(this.$store.state.token)
                let myInfo = await request('/api/token/base/info/select',
                    'post', params, 'application/x-www-form-urlencoded')
                // loading.hide()
                let res = result(myInfo)
                console.log('myInfo',myInfo)
                if(!res) return;
                this.userName = res.name;
                this.phone = res.phone;
                this.memberID = res.id
                this.headSculpture = res.headSculpture;
                this.password = res.password;
                if(res.baseStudent.length>0&&res.baseStudent[0].id){
                    localStorage['isHasStudent'] = true;
                }else{
                    localStorage['isHasStudent'] = false;
                }
                console.log(res)
                if(res.baseStudent.length>1){
                    if(this.$store.state.babyIndex){
                        console.log('存在',this.$store.state.babyIndex)
                        let indexs = Number(this.$store.state.babyIndex-1);
                        this.birthday = res.baseStudent[indexs].studentBirthday?res.baseStudent[indexs].studentBirthday.split(' ')[0]:'';
                        if( res.baseStudent[indexs].studentSex==0){
                            this.sex = '男';
                        }else {
                            this.sex = '女';
                        }
                        this.address = res.baseStudent[indexs].studentAddress;
                        this.babyName = res.baseStudent[indexs].studentName;
                        // this.kindergartenName = res.baseStudent.studentKindergartenName;
                        this.kindergartenId = res.baseStudent[indexs].studentKindergartenId;
                        this.baseClassID = res.baseStudent[indexs].studentClassId;
                        this.studentId = res.baseStudent[indexs].id
                    }else {
                        this.$router.push('/babyList');
                    }
                }else{
                    console.log('进来了')
                    this.birthday = res.baseStudent[0].studentBirthday?res.baseStudent[0].studentBirthday.split(' ')[0]:'';
                    if( res.baseStudent[0].studentSex==0){
                        this.sex = '男';
                    }else {
                        this.sex = '女';
                    }
                    this.address = res.baseStudent[0].studentAddress;
                    this.babyName = res.baseStudent[0].studentName;
                    this.studentId = res.baseStudent[0].id
                    this.kindergartenId = res.baseStudent[0].studentKindergartenId;
                    this.baseClassID = res.baseStudent[0].studentClassId;
                }


                // this.classes = res.baseStudent.studentClassName;

                //this.classLevel = res.baseClass.classLevel
                this.$nextTick(()=>{
                    this.getKindergarten();
                    this.getClass();
                })

            },
            async getKindergarten(){
                let params = {

                }

                let getClassInfo = await request('/api/base/kindergarten/select/'+this.kindergartenId,
                    'get', params, 'application/x-www-form-urlencoded')
                // loading.hide()
                let info = result(getClassInfo)
                // loading.hide()
                if(!info) return;
                console.log(info)
                this.kindergartenName = info.kindergartenName;
                this.$nextTick(()=>{
                    this.getClass();
                })

            },
            async getClass(){
                let params = {
                    kindergartenId:this.kindergartenId
                }
                let getClassInfo = await request('/api/base/class/list',
                    'post', params, 'application/x-www-form-urlencoded')
                // loading.hide()
                let info = result(getClassInfo)
                // loading.hide()
                if(!info) return;
                console.log('班级信息',info)
                for(let item of info){
                    if(item.id == this.baseClassID){
                        this.classes = item.className;
                        this.classLevel = item.classLevel;
                        // this.peopleNum = item.studentsNumber;
                    }
                }
            },
            editInfo(){
                if(this.$store.state.babyIndex){
                    this.$router.push('/editInfo?babyIndex='+Number(this.$store.state.babyIndex-1)+'&studentId='+this.studentId);//+'&kindergartenName='+this.kindergartenName+'&classes='+this.classes
                }else {
                    this.$router.push('/editInfo?babyIndex=0'+'&studentId='+this.studentId);//+'&kindergartenName='+this.kindergartenName+'&classes='+this.classes
                }

            },
            /**
             * 修改密码
             * */
            editPassword(){
                this.$router.push('./editPassword')
            },
            checkBaby(){
                this.$router.push('./babyList')
            },
            /**
             * 查看参赛作品
             * */
            work(){
                this.$router.push('./entries?kindergartenId='+this.kindergartenId+'&memberID='+this.memberID+'&baseClassID='+this.baseClassID+'&classLevel='+this.classLevel+'&token='+this.$store.state.token+'&studentId='+this.studentId)
            },
            /**
             * 查看交费记录
             * */
            payRecord(){
                this.$router.push('./payRecord')
            },
            /**
             * 注销账号，退出
             * */
            writeOff(){
                this.$store.commit('setToken','')
                this.$store.commit('setPhone','')
                this.$store.commit('setBabyIndex','')
                localStorage['isLogin'] = false;
                localStorage['isHasStudent'] = false;
                weui.toast('已退出',2000);
                this.$router.push('/login?isMyInfo=true')
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
        .top{
            background: url("img/myBg.png") no-repeat;
            background-size: 100%;
            //background: skyblue;
            width: 100%;
            height: 375rem / @rootFontSize;
            position: relative;

            .topContent{
                flex-wrap: wrap;
                display: flex;
                justify-content: center;
                width: 250rem  / @rootFontSize;
                height: 250rem  / @rootFontSize;
                position:absolute;
                top:50%;
                left:50%;
                transform: translate(-50%, -50%);
                .headImg{
                    border-radius: 50%;
                    background: #fff;
                    position: relative;
                    width: 150rem / @rootFontSize;
                    height: 150rem / @rootFontSize;
                    .quan{
                        position:absolute;
                        top:50%;
                        left:50%;
                        transform: translate(-50%, -50%);
                        border-radius: 50%;
                        background: #fff;
                        width: 140rem / @rootFontSize;
                        height: 140rem / @rootFontSize;
                        .upHeadImg{
                            display: block;
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            opacity: 0;
                            z-index: 99;
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                        img{
                            height: 100%;
                            width: 100%;
                            border-radius: 50%;

                        }
                        span{
                            width: 100%;
                            height: 100%;
                            display: block;
                            border-radius: 50%;
                            text-align: center;
                            color: #ff842c;
                            line-height: 140rem / @rootFontSize;
                        }
                    }
                }
            }
            .name{
                color: #fff;
                width: 100%;
                text-align: center;
                .font-dpr(16px);
            }
            .phoneNumber{
                display: flex;
                justify-content: space-between;
                padding: 0 20rem / @rootFontSize;
                box-sizing: border-box;
                align-items: center;
                width: 100%;
                color: #fff;
                background-color: rgba(0, 0, 0, 0.15);
                border-radius: 10px;
                line-height: 14px;
                img{
                    width: 36rem / @rootFontSize;
                    height: 36rem / @rootFontSize;
                }
            }
        }
        .userInfo{
            background: #fff;
            .font-dpr(16px);
            .userName{
                padding: 0 20rem / @rootFontSize;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100rem / @rootFontSize;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 32rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-right: 20rem / @rootFontSize;
                    }
                }
                .right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    color: #959595;
                    input{
                        border: none;
                        text-align: right;
                        color: #959595;
                    }
                    img{
                        width: 20rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-left: 20rem / @rootFontSize;
                    }
                }

            }
            .password{
                padding: 0 20rem / @rootFontSize;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100rem / @rootFontSize;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 32rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-right: 20rem / @rootFontSize;
                    }
                }
                .right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    color: #959595;
                    img{
                        width: 20rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-left: 20rem / @rootFontSize;
                    }
                }

            }
            .babyName{
                padding: 0 20rem / @rootFontSize;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100rem / @rootFontSize;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 32rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-right: 20rem / @rootFontSize;
                    }
                }
                .right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    color: #959595;
                    input{
                        border: none;
                        text-align: right;
                        color: #959595;
                    }
                    img{
                        width: 20rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-left: 20rem / @rootFontSize;
                    }
                }

            }
            .schoolName{
                padding: 0 20rem / @rootFontSize;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100rem / @rootFontSize;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 32rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-right: 20rem / @rootFontSize;
                    }
                }
                .right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    color: #959595;
                    img{
                        width: 20rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-left: 20rem / @rootFontSize;
                    }
                }

            }
            .classes{
                padding: 0 20rem / @rootFontSize;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100rem / @rootFontSize;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 32rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-right: 20rem / @rootFontSize;
                    }
                }
                .right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    color: #959595;
                    img{
                        width: 20rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-left: 20rem / @rootFontSize;
                    }
                }

            }
            .sex{
                padding: 0 20rem / @rootFontSize;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100rem / @rootFontSize;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 32rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-right: 20rem / @rootFontSize;
                    }
                }
                .right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    color: #959595;
                    img{
                        width: 20rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-left: 20rem / @rootFontSize;
                    }
                }

            }
            .birthday{
                padding: 0 20rem / @rootFontSize;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100rem / @rootFontSize;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 32rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-right: 20rem / @rootFontSize;
                    }
                }
                .right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    color: #959595;
                    img{
                        width: 20rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-left: 20rem / @rootFontSize;
                    }
                }

            }
            .regTime{
                padding: 0 20rem / @rootFontSize;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100rem / @rootFontSize;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 32rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-right: 20rem / @rootFontSize;
                    }
                }
                .right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    color: #959595;
                    img{
                        width: 20rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-left: 20rem / @rootFontSize;
                    }
                }

            }
            .address{
                padding: 0 20rem / @rootFontSize;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100rem / @rootFontSize;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 32rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-right: 20rem / @rootFontSize;
                    }
                }
                .right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    color: #959595;
                    input{
                        border: none;
                        text-align: right;
                        color: #959595;
                    }
                    img{
                        width: 20rem / @rootFontSize;
                        height: 32rem / @rootFontSize;
                        margin-left: 20rem / @rootFontSize;
                    }
                }

            }
            .xian{
                width: 91%;
                height: 1px;
                background: #f6f6f6;
                margin-left: 9%;
            }
        }
        .edit{
            background: #fff;
            width: 100%;
            height: 100rem / @rootFontSize;
            display: flex;
            justify-content: center;
            margin-top: 20rem / @rootFontSize;
            .btn{
                width: 80%;
                height: 100%;
                line-height: 100rem / @rootFontSize;
                background: #ff842c;
                //background: skyblue;
                border: none;
                border-radius: 20px;
                color: #fff;
            }
        }


    }

</style>