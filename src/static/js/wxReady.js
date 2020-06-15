import wxInfo from './wxPublicInfo'
import hex_md5 from 'js-md5'

import axios from 'axios'
let timestamp = new Date();
let noncestr = '';
let signature = '';
export default (url,apiList,success,error)=>{
    // 1,时间戳
    timestamp = parseInt(timestamp.getTime()/1000)
    console.log('时间戳', timestamp)

// 2,生成32位随机字符串
    function randomString() {
        let len =  32
        // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let charsLen = chars.length;
        let pwd = '';
        for (let i=0;i<len;i++) {
            pwd += chars.charAt(Math.floor(Math.random() * charsLen))
        }
        return pwd
    }
    noncestr = randomString();
    // SHA1


    let hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
    let chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */
    /*
     *
     * The main function to calculate message digest
     *
     */
    function hex_sha1(s) {

        return binb2hex(core_sha1(AlignSHA1(s)));

    }

    /*
     *
     * Perform a simple self-test to see if the VM is working
     *
     */
    function sha1_vm_test() {

        return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";

    }

    /*
     *
     * Calculate the SHA-1 of an array of big-endian words, and a bit length
     *
     */
    function core_sha1(blockArray) {

        let x = blockArray; // append padding
        let w = Array(80);

        let a = 1732584193;

        let b = -271733879;

        let c = -1732584194;

        let d = 271733878;

        let e = -1009589776;

        for (let i = 0; i < x.length; i += 16) // 每次处理512位 16*32
        {

            let olda = a;

            let oldb = b;

            let oldc = c;

            let oldd = d;

            let olde = e;

            for (let j = 0; j < 80; j++) // 对每个512位进行80步操作
            {

                if (j < 16)
                    w[j] = x[i + j];

                else
                    w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);

                let t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));

                e = d;

                d = c;

                c = rol(b, 30);

                b = a;

                a = t;

            }

            a = safe_add(a, olda);

            b = safe_add(b, oldb);

            c = safe_add(c, oldc);

            d = safe_add(d, oldd);

            e = safe_add(e, olde);

        }

        return new Array(a, b, c, d, e);

    }

    /*
     *
     * Perform the appropriate triplet combination function for the current
     * iteration
     *
     * 返回对应F函数的值
     *
     */
    function sha1_ft(t, b, c, d) {

        if (t < 20)
            return (b & c) | ((~b) & d);

        if (t < 40)
            return b ^ c ^ d;

        if (t < 60)
            return (b & c) | (b & d) | (c & d);

        return b ^ c ^ d; // t<80
    }

    /*
     *
     * Determine the appropriate additive constant for the current iteration
     *
     * 返回对应的Kt值
     *
     */
    function sha1_kt(t) {

        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;

    }

    /*
     *
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     *
     * to work around bugs in some JS interpreters.
     *
     * 将32位数拆成高16位和低16位分别进行相加，从而实现 MOD 2^32 的加法
     *
     */
    function safe_add(x, y) {

        let lsw = (x & 0xFFFF) + (y & 0xFFFF);

        let msw = (x >> 16) + (y >> 16) + (lsw >> 16);

        return (msw << 16) | (lsw & 0xFFFF);

    }

    /*
     *
     * Bitwise rotate a 32-bit number to the left.
     *
     * 32位二进制数循环左移
     *
     */
    function rol(num, cnt) {

        return (num << cnt) | (num >>> (32 - cnt));

    }

    /*
     *
     * The standard SHA1 needs the input string to fit into a block
     *
     * This function align the input string to meet the requirement
     *
     */
    function AlignSHA1(str) {

        let nblk = ((str.length + 8) >> 6) + 1,
            blks = new Array(nblk * 16);

        for (var i = 0; i < nblk * 16; i++)
            blks[i] = 0;

        for (var i = 0; i < str.length; i++)

            blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8);

        blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);

        blks[nblk * 16 - 1] = str.length * 8;

        return blks;

    }

    /*
     *
     * Convert an array of big-endian words to a hex string.
     *
     */
    function binb2hex(binarray) {

        let hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";

        let str = "";

        for (let i = 0; i < binarray.length * 4; i++) {

            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +

                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);

        }

        return str;

    }
// 4，paySign：微信签名
    function wxSignFunc() {
        let url = location.href.split('#')[0]
        // 4.1,将参数改写成 key=value&key2=value2 形式，需要按照参数名ASCII字典序排序
        let stringA = 'jsapi_ticket=kgt8ON7yVITDhtdwci0qefT5T560GcKQg5fqmfUrhayO0QD0CRvTifzvL8HNpPbKRqLoJvyB5b5C1k60nHBK_A'
            + '&noncestr=' + noncestr
            +'&timestamp=' + timestamp
            +'&url=' + url
        let stringSignTemp = stringA
        console.log(stringA)
        let sign = hex_sha1(stringSignTemp)//.toUpperCase()
        return sign
    }

    signature = wxSignFunc();
    console.log(timestamp,noncestr,signature)
    wx.config({
        debug: false,
        appId: wxInfo.wxAppId,
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: signature,
        jsApiList: apiList
    })
    wx.ready(()=>{
        success()
    })
    wx.error((error)=>{
        weui.alert(JSON.stringify(error))
    })
}
/*export default (url,apiList,success,error)=>{
    axios({
        method:'post',
        url:'/lyjlogin/jssdktoken/sign',
        data:`url=${url}`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res=> {
        console.log(res.data.data.timestamp)
        wx.config({
            debug: false,
            appId: wxInfo.wxAppId,
            timestamp: res.data.data.timestamp,
            nonceStr: res.data.data.noncestr,
            signature: res.data.data.signature,
            jsApiList: apiList
        })
        wx.ready(()=>{
            success()
        })
        wx.error((error)=>{
            weui.alert(JSON.stringify(error))
        })
    }).catch(err=>{
        console.log(err)
    })
}*/
