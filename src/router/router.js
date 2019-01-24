import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 导入对应路由的组件
import Markdown from '../components/Markdown.vue';
import Home from '../components/Home.vue';
import Page from '../components/Page.vue';
import Compile from '../components/Compile.vue';

export default new Router({
	// 路由匹配规则
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: Home },
		{ path: '/markdown', component: Markdown, name: 'markdown' },
		{ path: '/home/page/:id', component: Page, name: 'page' },
		{ path: '/home/compile/:id', component: Compile, name: 'compile' }
	]
});
