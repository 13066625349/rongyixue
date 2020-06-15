/**
 * Created by liuch on 2019/02/27.
 */

import axios from 'axios'


//封装axios
function axiosRequest(url,type,params,contentType,resolve,reject){
    //处理参数
    let param = {}
    if(contentType.contentType==='application/x-www-form-urlencoded'){
        let paramsArr = []
        for(let key in params){
            paramsArr.push(`${key}=${params[key]}`)
        }
        param = paramsArr.join('&')
    }else{
        param=params

    }
        axios({
            url:url,
            method:type,
            data:param,
            headers: {
                'Content-Type': contentType.contentType,
                'Authorization': 'Bearer'+' '+contentType.token

            }
        }).then((res)=>{
            console.log(res)
            if(res.status===200){
                resolve(res.data)
            }else{
                resolve(res.data)
            }
        }).catch(err=>{
            reject(err)
        })
}
// //return一个promise
function getInfoRequest(url,type,params,contentType){

    return new Promise(function(resolve,reject){
        axiosRequest(url,type,params,contentType,resolve,reject)
    })


}
// //在async函数中执行ajax 获取data
// // getInfo 参数 http请求url，xsytoken，contentType，请求方式，dataType，参数
// //返回值  服务器返回信息
//
//
async function request(url,type,params,contentType) {
    console.log(url)
    try{
        return getInfoRequest(url,type,params,contentType)
    }catch(e){
        return e
    }
}
//
// export default getInfo

export default request