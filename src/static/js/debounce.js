//防抖


function debounce(fn, delay) {
    let timer = null;
    return function () {
        let _self = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(_self, arguments);
        }, delay);
    }
}

export default debounce