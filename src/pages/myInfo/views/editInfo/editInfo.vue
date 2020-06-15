<template>
    <div class="main">
        <div v-wechat-title="$route.meta.title"></div>
        <!-- 用户信息 -->
        <div class="top">
            <div class="topContent">
                <div class="headImg">
                    <div class="quan">
                        <!--<span v-if="!headSculpture">点击上传</span>-->
                        <img :src="avatarFile" alt="">
                        <img :src="headSculpture?headSculpture:require('../img/default-head.png')" alt="">
                        <form enctype="multipart/form-data">
                            <input class="upHeadImg" type="file" name="image" accept="image/*" @change='upHeadImg' ref="headImg">
                        </form>
                    </div>
                </div>
                <div class="phoneNumber">
                    <span>{{phone}}</span>
                </div>
            </div>
            <!--<div class="yzm" >发送验证码</div>-->
        </div>
        <div class="userInfo">
            <div class="userName">
                <div class="left">
                    <img src="../img/username.png" alt="">
                    <span>家长姓名</span>
                </div>
                <div class="right" >
                    <input type="text" v-model="userName" placeholder="请输入姓名">
                    <!--<span>{{userName}}</span>-->
                    <img src="../img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="babyName">
                <div class="left">
                    <img src="../img/babyname.png" alt="">
                    <span>宝宝姓名</span>
                </div>
                <div class="right" >
                    <input type="text" v-model="babyName" placeholder="请输入宝宝姓名">
                    <img src="../img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="sex" @click="pickerSex">
                <div class="left">
                    <img src="../img/sex.png" alt="">
                    <span>宝宝性别</span>
                </div>
                <div class="right" >
                    <span>{{sex}}</span>
                    <img src="../img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="birthday" @click="pickerBirth">
                <div class="left">
                    <img src="../img/birthday.png" alt="">
                    <span>宝宝出生日期</span>
                </div>
                <div class="right" >
                    <span>{{birthday}}</span>
                    <img src="../img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="schoolName" @click="pickerSchool()">
                <div class="left">
                    <img src="../img/schoolname.png" alt="">
                    <span>幼儿园名称</span>
                </div>
                <div class="right">
                    <span>{{kindergartenName}}</span>
                    <img src="../img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <div class="classes" @click="pickerClass()">
                <div class="left">
                    <img src="../img/classes.png" alt="">
                    <span>班级</span>
                </div>
                <div class="right" >
                    <span v-if="classes">{{classes}}</span>
                    <span v-if="!classes">选择班级</span>
                    <img src="../img/jiantou.png" alt="">
                </div>
            </div>
            <div class="xian"></div>
            <!--<div class="address">
                <div class="left">
                    <img src="../img/address.png" alt="">
                    <span>地址</span>
                </div>
                <div class="right" >
                    <input type="text" v-model="address" placeholder="请输入地址">
                    <img src="../img/jiantou.png" alt="">
                </div>
            </div>-->
            <div class="address">
                <div class="left">
                    <img src="../img/address.png" alt="">
                    <span>地址</span>
                </div>
                <div class="right" >
                    <span class="spanStyle"  @click="isAddress=true"  v-show="address==''">选择地址</span>
                    <span class="spanStyle"  v-show="address!=''"  @click="isAddress=true">{{address}}</span>
                    <weui-distpicker :province="message.province"
                                     :city="message.city"
                                     :area="message.area"
                                     v-if="isAddress"
                                     @confirm="onConfirm"
                                     @cancel="onCancel"
                                     @change="change">
                    </weui-distpicker>
                    <img src="../img/jiantou.png" alt="">
                </div>

            </div>
            <div class="xian"></div>
            <div class="edit">
                <button class="btn" @click="editSave()">保存</button>
            </div>
        </div>

    </div>
</template>

<script>
    import request from '../../../../static/js/request';
    import request1 from '../../../../static/js/request1';//header中有token值请求
    import {request2} from '../../../../static/js/request2';
    import result from '../../../../static/js/result';
    import axios from 'axios'
    import WeuiDistpicker from 'weui-distpicker'
    export default {
        components: { WeuiDistpicker },
        data() {
            return {
                id:0,//用户ID
                headSculpture:'',//头像
                phone:'',//手机号
                password:'',
                isShow:false,
                babyIndex:this.$route.query.babyIndex?this.$route.query.babyIndex:'',
                userName:'',//姓名
                babyName:'',//宝宝姓名
                kindergartenName:'',//幼儿园名称
                classes:'',//班级名称
                birthday:'',//出生日期
                sex:'',//性别
                sexId:0,
                kindergartenId:0,//幼儿园ID
                classes:'',//班级名称
                baseClassID:0,//班级ID
                classesInfo:[],//班级信息数组
                kindergartenInfo:[],//幼儿园信息数组
                address:'',//地址
                avatarFile:'',//用于显示头像
                isAddress:false,
                message: {
                    province: '北京市',
                    city: '北京城区',
                    area: '东城区'
                },
            }
        },
        mounted() {

        },
        created() {
            console.log('头像啊',this.headSculpture)
            this.phone = this.$route.query.phone;
            this.getInfo();
            console.log('性别',this.sex)
        },

        methods: {
            change(data){
                console.log(data)
            },
            onConfirm(data ){
                this.message.province = data[0].label;
                this.message.city = data.length >= 2 ? data[1].label : '';
                this.message.area = data.length == 3 ? data[2].label : '';
                console.log(this.message);
                this.address = this.message.province + '-' + this.message.city + '-' + this.message.area;
                this.isAddress = false;
            },
            onCancel(){
                this.isAddress = false;
            },
            async getInfo(){
                let params = {
                    phone:this.$store.state.phone,
                    access_token:this.$store.state.token
                }
                /*let headers = {
                    contentType:'application/x-www-form-urlencoded',
                    token:this.$store.state.token

                }*/
                let myInfo = await request('/api/token/base/info/select',
                    'post', params, 'application/x-www-form-urlencoded')
                // loading.hide()
                let res = result(myInfo)
                // loading.hide()
                if(!res) return;

                console.log(res)
                this.id = res.id;
                this.userName = res.name;
                this.phone = res.phone;
                this.headSculpture = res.headSculpture;
                this.password = res.password;
                this.birthday = res.baseStudent[this.babyIndex].studentBirthday?res.baseStudent[this.babyIndex].studentBirthday.split(' ')[0]:'';
                if( res.baseStudent[this.babyIndex].studentSex==0){
                    this.sex = '男';
                }else {
                    this.sex = '女';
                }
                this.babyName = res.baseStudent[this.babyIndex].studentName;

                this.address = res.baseStudent[this.babyIndex].studentAddress?res.baseStudent[this.babyIndex].studentAddress:'';
                console.log('地址',this.address)
                this.message.province = this.address.split('-')[0];
                this.message.city = this.address.split('-')[1];
                this.message.area = this.address.split('-')[2];
                // this.kindergartenName = res.baseStudent.studentKindergartenName;
                this.kindergartenId = res.baseStudent[this.babyIndex].studentKindergartenId;
                this.baseClassID = res.baseStudent[this.babyIndex].studentClassId;
                this.$nextTick(()=>{
                    this.getKindergarten();
                    this.getClass();
                })

            },

            /**
             * 上传头像
             * */
            async upHeadImg (e) {
                let file = e.target.files[0]
                let formData = new window.FormData();
                //formData.avatarFile = file.name
                formData.append('avatarFile', file,file.name);
                formData.append('access_token',this.$store.state.token)
                console.log(file.name)
                console.log('上传文件',formData.get('avatarFile'))
                this.headSculpture = window.URL.createObjectURL(e.target.files[0]);
                /* let headers = {
                     contentType:'multipart/form-data',
                     token:this.$store.state.token
                 }*/
                let upImg = await request('/api/token/base/info/editAvatar?access_token='+this.$store.state.token,
                    'post',formData,'multipart/form-data')
                // loading.hide()
                let res = result(upImg)
                if(!res) return;
                console.log('上传结果',upImg);
                this.headSculpture = upImg.msg;
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
                    for(let item of getClassInfo.rows){
                        if(item.id == this.kindergartenId){
                            this.kindergartenName = item.kindergartenName;
                        }
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
                if(info){
                    for(let item of info){
                        if(item.id == this.baseClassID){
                            this.classes = item.className;
                            // this.peopleNum = item.studentsNumber;
                        }
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
            /**
             * 选择性别
             * */
            pickerSex(){
                let _this = this;

                weui.picker([
                    {
                        label: '男',
                        value: 0
                    }, {
                        label: '女',
                        value: 1
                    }
                ], {
                    className: 'custom-classname',
                    container: 'body',
                    defaultValue: [],
                    onChange: function (result) {
                        console.log(result)
                    },
                    onConfirm: function (result) {
                        console.log(result[0].label);
                        _this.sex = result[0].label;
                        _this.sexId = result[0].value;

                    },
                    id: 'singleLinePicker'
                });


            },
            /**
             * 选择出生日期
             * */
            pickerBirth(){
                let _this = this;
                let year = new Date().getFullYear();
                let month = new Date().getMonth()+1;
                let day = new Date().getDate();
                console.log(year,month,day)
                weui.datePicker({
                    start: 1990,
                    end: year,
                    defaultValue: [year, month, day],
                    onChange: function(result){
                        console.log(result);
                    },
                    onConfirm: function(result){
                        console.log(result);
                        _this.birthday = result[0].value+'-'+result[1].value+'-'+result[2].value;
                        console.log(_this.birthday)
                    },
                    id: 'datePicker'
                });


            },
            /**
            * 添加学生
            * */
            async addStudent(){
                let params1 = {
                    studentAddress : this.address,
                    studentClassId : this.baseClassID,
                    studentClassName:this.classes,
                    studentBirthday : this.birthday,
                    studentKindergartenId : this.kindergartenId,
                    studentKindergartenName:this.kindergartenName,
                    studentName:this.babyName,
                    studentSex : this.sexId,
                }
                let addStudent = await request('api/base/info/student/add',
                    'post', params1, 'application/x-www-form-urlencoded')
                // loading.hide()
                let res1 = result(addStudent);
                if(!res1) return;
                let studentId = addStudent.data
                /*关联学生家长*/
                let params3 = {
                    studentId:studentId,
                    userIds:this.id,
                    access_token:this.$store.state.token,
                }
                let relatedness = await request('/api/token/base/student/authMember/selectAll',
                    'post', params3, 'application/x-www-form-urlencoded')
                // loading.hide()
                let res3 = result(relatedness);
                if(!res3) return;
                weui.toast('修改成功',2000)
                this.$router.go(-1);
            },
            /**
             * 保存修改资料
             * */
            async editSave(){
                console.log('保存修改了');
                if(!this.userName){
                    weui.alert("请输入姓名！");
                    return false;
                }
                if(!this.babyName){
                    weui.alert("请输入宝宝名字！");
                    return false;
                }
                if(!this.kindergartenName){
                    weui.alert("请选择幼儿园！");
                    return false;
                }
                if(!this.classes){
                    weui.alert("请选择班级！");
                    return false;
                }
                if(!this.sex){
                    weui.alert("请选择性别！");
                    return false;
                }
                if(!this.birthday){
                    weui.alert("请选择出生日期！");
                    return false;
                }
                if(!this.address){
                    weui.alert("请输入地址！");
                    return false;
                }

                let params = {
                    access_token:this.$store.state.token,
                    id:this.id,
                    name : this.userName
                };
                let loading = weui.loading('loading', {
                    className: 'custom-classname'
                });
                if(this.headSculpture){
                    params.headSculpture = this.headSculpture
                }
                /*let headers = {
								contentType:'application/x-www-form-urlencoded',
								token:this.$store.state.token

							};*/
                let editInfo = await request('/api/token/base/info/edit',
                    'post', params, 'application/x-www-form-urlencoded')
                // loading.hide()
                let res = result(editInfo)
                //loading.hide()
                if(!res) return;
                if(this.$route.query.studentId!='null'){
                    let params1 = {
                        access_token:this.$store.state.token,
                        id:this.$route.query.studentId,
                        studentAddress : this.address,
                        studentClassId : this.baseClassID,
                        studentClassName:this.classes,
                        studentBirthday : this.birthday,
                        studentKindergartenId : this.kindergartenId,
                        studentKindergartenName:this.kindergartenName,
                        studentName:this.babyName,
                        studentSex : this.sexId,
                    };
                    let editInfo1 = await request('/api/token/base/student/edit',
                        'post', params1, 'application/x-www-form-urlencoded')
                    // loading.hide()
                    let res1 = result(editInfo1)
                    loading.hide()
                    if(!res1) return;
                    console.log('修改成功',editInfo)
                    weui.toast('修改成功',2000)
                    this.$router.go(-1);
                }else{
                    loading.hide()
                    this.addStudent();
                }

            },
            /**
             * 修改密码
             * */
            editPassword(){
                console.log('修改密码');
                this.$router.push('./editPassword')
            },

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
            background: url("../img/myBg.png") no-repeat;
            background-size: 100%;
            //background: skyblue;
            width: 100%;
            height: 375rem / @rootFontSize;
            position: relative;
            .yzm{
                color: #fff;
                margin-top: 5px;
                position: absolute;
                top: 0;
                left: 0;
            }
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
                justify-content: center;
                align-items: center;
                width: 100%;
                border-radius: 10px;
                line-height: 14px;
                background-color: rgba(0, 0, 0, 0.15);
                border-radius: 10px;
                span{
                    color: #fff;
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
            .phoneCode{
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
            .phone{
                padding: 0 20rem / @rootFontSize;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100rem / @rootFontSize;
                button{
                    border: none;
                    background: #fff;
                    width: 100%;
                    height: 100%;
                    color: #999;
                }
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
                // background: skyblue;
                border: none;
                border-radius: 20px;
                color: #fff;
            }
        }


    }

</style>