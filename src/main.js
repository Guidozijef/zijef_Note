// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import app from './App';

// 1.1导入路由的包
import VueRouter from 'vue-router';
// 1.2安装路由
Vue.use(VueRouter);
// 1.3导入自己的路由包
import router from './router/router';

// 注册vuex
import Vuex from 'vuex';
Vue.use(Vuex);

// 引入iconfont字体图标文件
import './assets/IconFont/iconfont.css';

// 导入格式化时间插件
import moment from 'moment';
// 定义全局的过滤器
// Vue.filer(‘管道符名称’，方法)

Vue.filter('dateFormat', function(value, formatString) {
	formatString = formatString || 'YYYY-MM-DD HH:mm';
	return moment(value).format(formatString);
});

// import './assets/github-markdown.min.css'; //markdown样式文件
import './assets/css/marxico.css'; //markdown样式文件

// 导入封装后的axios
import axios from './request.js'; // 全局添加请求函数配置
Vue.prototype.$axios = axios;

//  每次进入网站先读取本地存储的文章信息,然后赋值给 store 中的 list，再在 store 中取数据
var list = JSON.parse(localStorage.getItem('list') || '[]');
const store = new Vuex.Store({
	state: {
		// 使用属性 this.$store.state.***
		list: list
	},
	mutations: {
		// 调用方法  this.$store.commit('方法名','按需传递唯一的参数')
		addToList(state, info) {
			// 点击保存将文章信息保存到 store 上
			state.list.push(info);
			// 把 state 的数据存储到 本地localStorage 中
			localStorage.setItem('list', JSON.stringify(state.list));
		}
	},
	getters: {
		// this.$store.getters.***
	}
});

// 导入element-ui
import {
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Input,
	InputNumber,
	Button,
	Card,
	Dialog,
	Message,
	Slider
} from 'element-ui';
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Button.name, Button);
Vue.component(Card.name, Card);
Vue.component(Dialog.name, Dialog);
Vue.component(Message.name, Message);
Vue.component(Slider.name, Slider);

// 将 Message 直接挂在 Vue 实例上
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

import './assets/css/defind.scss'; // 自定义去掉body的margin
/* eslint-disable no-new */
var vm = new Vue({
	el: '#app',
	render: (c) => c(app), // 渲染
	// 1.4 挂载路由对象到 vm 实例上
	router,
	store // 挂载 store 状态管理器
});
