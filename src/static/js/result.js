
let result=(result)=>{

    if(parseInt(result.code)===0 || result.appid=="wxe06e090e9bf3dbb3" ) {
        return result.data || true
    }else{
        /*if(result.message){
            weui.alert(result.message);
        }else {
            weui.alert(result.msg);
        }*/

        //错误逻辑
        //return result.data
        //返回false
        return false
    }
}

export default result