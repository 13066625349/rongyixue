//节流
function throttle(fn, cycle) {
    let start = Date.now();
    let now;
    let timer;
    return function () {
        let _self = this;
        now = Date.now();
        clearTimeout(timer);
        if (now - start >= cycle) {
            fn.apply(_self, arguments);
            start = now;
        } else {
            timer = setTimeout(() => {
                fn.apply(_self, arguments);
                console.log(_self)
            }, cycle);
        }
    }
}

export default throttle