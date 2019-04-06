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
var defaultList = JSON.stringify([{ "title": "欢迎使用笔仙", "time": 1554536285000, "content": "# 欢迎使用笔仙\n\n@(示例笔记本)[笔仙|帮助|Markdown]\n\n**笔仙**是一款专为做笔记（Evernote）、写技术博客打造的Markdown编辑器，通过精心的设计与技术实现，配合强大的存储和同步功能，带来前所未有的书写体验。特点概述：\n \n- **功能丰富** ：支持高亮代码块、*LaTeX* 公式、流程图，本地图片以及附件上传，甚至截图粘贴，工作学习好帮手；\n- **得心应手** ：简洁高效的编辑器，提供离线存儲，支持移动端 Web；\n- **深度整合** ：支持选择笔记本和添加标签，支持跳转编辑，轻松管理。\n- **简洁舒适** ：提供强大的换肤系统，根据每个人的写作灵感和阅读的舒适度，提供不同的背景。\n\n-------------------\n\n[TOC]\n\n## Markdown简介\n\n> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— [维基百科](https://zh.wikipedia.org/wiki/Markdown)\n\n正如您在阅读的这份文档，它使用简单的符号标识不同的标题，将某些文字标记为**粗体**或者*斜体*，创建一个[链接](http://www.example.com)或一个脚注[^demo]。下面列举了几个高级功能，更多语法请按`Ctrl + /`查看帮助。 \n\n### 代码块\n``` python\n@requires_authorization\ndef somefunc(param1='', param2=0):\n    '''A docstring'''\n    if param1 > param2: # interesting\n        print 'Greater'\n    return (param2 - param1 + 1) or None\nclass SomeClass:\n    pass\n>>> message = '''interpreter\n... prompt'''\n```\n### LaTeX 公式\n\n可以创建行内公式，例如 $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$。或者块级公式：\n\n$$	x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$\n\n### 表格\n| Item      |    Value | Qty  |\n| :-------- | --------:| :--: |\n| Computer  | 1600 USD |  5   |\n| Phone     |   12 USD |  12  |\n| Pipe      |    1 USD | 234  |\n\n### 流程图\n```flow\nst=>start: Start\ne=>end\nop=>operation: My Operation\ncond=>condition: Yes or No?\n\nst->op->cond\ncond(yes)->e\ncond(no)->op\n```\n\n以及时序图:\n\n```sequence\nAlice->Bob: Hello Bob, how are you?\nNote right of Bob: Bob thinks\nBob-->Alice: I am good thanks!\n```\n\n> **提示：**想了解更多，请查看**流程图**[语法][3]以及**时序图**[语法][4]。\n\n### 复选框\n\n使用 `- [ ]` 和 `- [x]` 语法可以创建复选框，实现 todo-list 等功能。例如：\n\n- [x] 已完成事项\n- [ ] 待办事项1\n- [ ] 待办事项2\n\n> **注意：**目前支持尚不完全，在笔记中勾选复选框是无效、不能同步的，所以必须在**笔仙**中修改 Markdown 原文才可生效。下个版本将会全面支持。\n\n\n## 笔记相关\n\n### 笔记本和标签\n**笔仙**增加了`@(笔记本)[标签A|标签B]`语法, 以选择笔记本和添加标签。 **绑定账号后**， 输入`(`自动会出现笔记本列表，请从中选择。\n\n### 笔记标题\n**笔仙**会自动使用文档内出现的第一个标题作为笔记标题。例如本文，就是第一行的 `欢迎使用笔仙`。\n\n### 快捷编辑\n保存在浏览器中的笔记，点击阅读标题右边会有一个红色的编辑按钮，点击后会回到**笔仙**中打开并编辑该笔记。\n\n> **注意**：目前用户在单方面做的任何修改，笔仙是无法自动感知和更新的。所以请务必回到笔仙中编辑。\n\n### 数据同步\n**笔仙**通过**将Markdown原文以隐藏内容保存在笔记中**的精妙设计，实现了对Markdown的存储和再次编辑。既解决了其他产品只是单向导出HTML的单薄，又规避了服务端存储Markdown带来的隐私安全问题。这样，服务端仅作为对笔仙 API调用和数据转换之用。\n\n >**隐私声明：用户所有的笔记数据，均保存在本地浏览器或者服务器中。笔仙不存储用户的任何笔记数据。**\n\n### 离线存储\n**笔仙**使用浏览器离线存储将内容实时保存在本地，不必担心网络断掉或浏览器崩溃。为了节省空间和避免冲突，已同步至服务器并且不再修改的笔记将删除部分本地缓存，不过依然可以随时通过`文档管理`打开。\n\n> **注意：**虽然浏览器存储大部分时候都比较可靠，但笔仙作为专业云存储，更值得信赖。以防万一，**请务必经常及时同步笔仙服务器**。\n\n## 编辑器相关\n### 设置\n右侧系统菜单（快捷键`Ctrl + M`）的`设置`中，提供了界面字体、字号、自定义CSS、vim/emacs 键盘模式等高级选项。\n\n### 快捷键\n\n帮助    `Ctrl + /`\n同步文档    `Ctrl + S`\n创建文档    `Ctrl + Alt + N`\n最大化编辑器    `Ctrl + Enter`\n预览文档 `Ctrl + Alt + Enter`\n文档管理    `Ctrl + O`\n系统菜单    `Ctrl + M` \n\n加粗    `Ctrl + B`\n插入图片    `Ctrl + G`\n插入链接    `Ctrl + L`\n提升标题    `Ctrl + H`\n\n\n\n\n## 反馈与建议\n- 微博：[@笔仙](http://zijef.pw/zijef_Note/#/home)，[@Gavin zijef](http://zijef.pw '开发者个人账号')\n- 邮箱：<913497146@qq.com>\n\n---------\n感谢阅读这份帮助文档。请点击右上角，绑定笔仙账号，开启全新的记录与分享体验吧。\n\n\n\n\n[^demo]: 这是一个示例脚注。请查阅 [MultiMarkdown 文档](https://github.com/fletcher/MultiMarkdown/wiki/MultiMarkdown-Syntax-Guide#footnotes) 关于脚注的说明。 **限制：** 笔仙的笔记内容使用 [ENML][5] 格式，基于 HTML，但是不支持某些标签和属性，例如id，这就导致`脚注`和`TOC`无法正常点击。\n\n\n  [1]: http://maxiang.info/client_zh\n  [2]: https://chrome.google.com/webstore/detail/kidnkfckhbdkfgbicccmdggmpgogehop\n  [3]: http://adrai.github.io/flowchart.js/\n  [4]: http://bramp.github.io/js-sequence-diagrams/\n  [5]: https://dev.yinxiang.com/doc/articles/enml.php\n\n", "imgValue": 660, "bgValue": 660 }]);
localStorage.setItem('list', defaultList);
var list = JSON.parse(localStorage.getItem('list'));
// console.log(localStorage.getItem('list'));
// console.log(JSON.parse(localStorage.getItem('list')));
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
