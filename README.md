# 博客系统平台

> 一款基于vue.js的本地博客写作系统

用于在本地写技术博客或者记事，支持markdown语法，在阅读的时候有问题可以随时修改或者更新，主要应用技术:
 + vue.js 前端框架
 + vue-cli vue 脚手架构架工具。
 + vue-router 用来处理vue项目中路由的配置
 + mavonEditor markdown语法支持，解析md，十分方便。
 + vuex 处理本地数据的存储与获取，更加方便的处理个组件的传值，跟踪查看数据源。

> 目前只是一个简单本地写博客功能，后期有时间还会继续优化更新

## 后期预期效果
 + 增加登录注册功能，搭建真正的技术博客平台。
 + 结合leancloud实现数据简单的数据存储。
 + 增加评论、点赞等功能。
 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
