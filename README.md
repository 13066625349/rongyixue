# wechat-offcial-accounts

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```




###1像素边框
Src/css/border-1px.css


###reset.css
Src/css/reset.css

###transition.less
跳转子路由或者父路由动画 按需引入 @import


### 防抖函数
src/js/debounce.js

### 节流函数
src/js/throttle.js

### 获取url参数
src/js/getParam.js

### 请求
src/js/request.js

### 判断结果
src/js/result.js

### 页面标题
路由配置meta
页面内使用 <div v-wechat-title="$route.meta.title"></div>

### less中的字体

引入mixin.less 
div{
  .font-dpr(14px)   //14px为dpr为1是的字体大小
}

### 宽高写法

引入minin.less


宽高为414*80的div
div{
  Width:414rem/@rootFontSize;
  Hight:80rem/@rootFontSize
}


