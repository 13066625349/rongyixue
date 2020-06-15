/**
 * 时间戳 1559840768000 转换成日期格式 2019-06-07 01:06:08 。
 * @param   time		{ int }		[ 时间戳 ]
 * @return  dateTime    {number}    [ 返回日期格式 ]
 */
let formatDate = (time) => {
    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let date = new Date(parseInt(time));
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let HH = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + HH + mm + ss;
};

export default formatDate
