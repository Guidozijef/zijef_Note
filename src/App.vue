<template>
  <div id="app-container">
    <!-- <div class="container">
      
    </div>-->
    <!-- header区域 -->
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#420B5C"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <div class="logo">
        <img src="./assets/title.png" alt>
      </div>
      <el-menu-item index="1">我的博客</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1" v-for="classify in classifys" :key="classify.legth">{{ classify }}</el-menu-item>
        <el-menu-item index="2-4" @click="addToClassify()">
          <i class="el-icon-circle-plus-outline"></i>新增
        </el-menu-item>

        <!-- <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>-->
      </el-submenu>
      <el-menu-item index="3">个人中心</el-menu-item>
      <el-menu-item index="4">
        <a href="#" target="_blank">博客管理</a>
      </el-menu-item>
      <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
      </div>
      <div></div>
      <div class="write" @click="write()">
        <el-button type="danger" icon="el-icon-edit-outline" circle></el-button>
      </div>
      <div class="back" @click="goback()" v-show="flag">
        <el-button type="danger" icon="el-icon-back" circle></el-button>
      </div>
    </el-menu>

    <!-- 添加分类弹出类名输入框 -->
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
    <el-dialog title="请输入类名" :visible.sync="dialogFormVisible" width="30%">
      <el-input v-model="className"></el-input>
      <!-- <el-input v-model="className" autocomplete="off"></el-input> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 写文章时保存提示弹框 -->
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>内容是否已保存？</span>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
        <el-button type="primary" @click="ok()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 背景粒子 -->
    <vue-particles
      class="particles"
      color="#420c5c"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="star"
      :particleSize="6"
      linesColor="#420c5c"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>

    <router-view></router-view>
  </div>
</template>

<script>
// 进来时先将数据从localStorage中取出来
var classlist = JSON.parse(localStorage.getItem("classlist") || "[]");

export default {
  data() {
    return {
      // classifys: ["选项1", "选项2", "选项3", "选项4"],
      classifys: classlist,
      activeIndex: "1",
      activeIndex2: "1",
      flag: false, // 返回键的隐藏和显示
      dialogVisible: false, // 控制保存提示框
      dialogFormVisible: false, // 控制类名提示框的弹出
      className: ""
    };
  },
  created() {
    // if(this.$router.path === '/home'){
    //     this.flag = false;
    //   }else{
    //     this.flag = true;
    //   }
    // 等价于
    this.flag = this.$route.path === "/home" ? false : true; // 一开始就监听路由当为主页路由链接时返回键就隐藏
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击增加分类
    addToClassify() {
      this.dialogFormVisible = true; // 打开弹框
    },
    // 点击确认键，添加类到列表中
    sure() {
      this.dialogFormVisible = false;
      this.classifys.push(this.className);
      this.className = "";
      // 将创建的类名数据保存到localstorage中
      localStorage.setItem("classlist", JSON.stringify(this.classifys));
    },
    write() {
      // 点击进入markcown组件中
      this.$router.push({ name: "markdown" });
    },
    // 在/markdown页面中，点击返回，弹出保存提示框
    goback() {
      if (this.$route.path === "/markdown") {
        this.dialogVisible = true;
      } else {
        // 点击返回上一步
        this.$router.go(-1);
        // 返回后马上将数据请求到store中，然后渲染，避免因为后面修改文章，不显示最新数据
        var list = JSON.parse(localStorage.getItem("list") || "[]");
        this.$store.state.list = list;
      }
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {})
      //   .catch(_ => {});
      this.dialogVisible = false;
    },
    ok() {
      this.dialogVisible = false;
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function(newVal) {
      // 监听路由发生变化就显示或者隐藏返回按钮
      if (newVal === "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  },
  name: "App"
};
</script>
<style lang="scss" scoped>
// .container{
//   width: 100%;
//   height: 100%;
//   background: url("./assets/home_top_bg.jpg") 50% center / cover no-repeat  rgb(255, 255, 255);
// }
.logo {
  img {
    height: 60px;
    float: left;
    margin: 0 50px;
  }
}
.search {
  width: 300px;
  float: left;
  line-height: 59px;
  margin: 0 50px;
}
.write {
  line-height: 59px;
  float: right;
  margin-right: 80px;
}
.back {
  line-height: 59px;
  float: right;
  margin-right: 10px;
}
.particles {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}
</style>

