
let result=(result)=>{

    if(parseInt(result.code)===0 || result.appid=="wxce7e78ccfdb3ae71" ) {
        return result.data || true
    }else{
        if(result.message){
            weui.alert(result.message);
        }/*else {
            weui.alert(result.msg);
        }*/

        //错误逻辑
        //return result.data
        //返回false
        return result.data && false
    }
}

export default result