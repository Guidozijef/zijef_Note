<template>
  <div id="app-container">
    <!-- <div class="container">
      
    </div>-->
    <!-- header区域 -->
    <el-menu
      style="position:fixed;
      top: 0px;
      left: 0;
      width: 100%;
      zIndex:99;
      border-bottom:none;"
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#000"
      active-text-color="#007BFB"
    >
      <div class="logo">
        <img src="./assets/images/bixian.png" alt>
      </div>
      <el-menu-item index="1">
        <router-link to="/">我的博客</router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1" v-for="classify in classifys" :key="classify.legth">{{ classify }}</el-menu-item>
        <el-menu-item index="2-4" @click="addToClassify()">
          <i class="el-icon-circle-plus-outline"></i>新增
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="3">个人中心</el-menu-item>
      <el-menu-item index="4">
        <a href="javascript:;" target="_blank">博客管理</a>
      </el-menu-item>
      <div class="search">
        <input type="text" placeholder="请输入内容" v-model="seachValue" @keydown.enter="seach()">
        <i class="el-icon-search"></i>
      </div>
    </el-menu>
    <div class="write" @click="write()" tabindex="none">
      <i
        class="iconfont icon-bianji"
        title="写文章"
        style="fontSize:22px;cursor:pointer;color:#5E5E5E;"
      ></i>
      <!-- <el-button type="danger" icon="el-icon-edit-outline" circle></el-button> -->
    </div>
    <div class="back" @click="goback()" v-show="this.$route.path !== '/home'" tabindex="none">
      <i
        class="iconfont icon-ffanhui-"
        title="返回"
        style="fontSize:22px;cursor:pointer;color:#5E5E5E;"
      ></i>
    </div>
    <!-- <div class="music" @click="stopMusic()">
      <img src="./assets/音符.png" alt style="height:30px;" id="musicImg" class="rotation">
    </div>-->

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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>内容是否已保存？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
        <el-button type="primary" @click="ok()">确 定</el-button>
      </span>
    </el-dialog>

    <router-view></router-view>
    <!-- <audio
      id="audio"
      preload="auto"
      autoplay
      loop
      src="http://music.163.com/song/media/outer/url?id=31721419.mp3"
    >Your browser does not support the audio element.</audio>-->
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
      className: "",
      seachValue: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
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
      } else if (this.$route.params.id) {
        this.$router.push("/home");
        // 返回后马上将数据请求到store中，然后渲染，避免因为后面修改文章，不显示最新数据
        var list = JSON.parse(localStorage.getItem("list") || "[]");
        this.$store.state.list = list;
      } else {
        // 点击返回上一步
        this.$router.go(-1);
        // 返回后马上将数据请求到store中，然后渲染，避免因为后面修改文章，不显示最新数据
        var list = JSON.parse(localStorage.getItem("list") || "[]");
        this.$store.state.list = list;
      }
    },
    ok() {
      this.dialogVisible = false;
      this.$router.go(-1);
    },
    seach() {
      let seachList = [];
      let _this = this;
      this.$store.state.list.forEach((item, index) => {
        if (item.title.indexOf(_this.seachValue) != -1) {
          seachList.push(item);
        }
      });
      this.$store.state.list = seachList;
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
  position: relative;
  input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 35px;
    line-height: 35px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding-left: 30px;
    width: 100%;
    &:focus {
      border-color: #1980e6;
    }
  }
  .el-icon-search {
    position: absolute;
    left: 10px;
    top: 22px;
    color: #C0C4CC;
  }
}
.write {
  line-height: 59px;
  float: right;
  margin-right: 80px;
  position: fixed;
  z-index: 99;
  top: 0;
  right: 10px;
}
.back {
  line-height: 59px;
  float: right;
  margin-right: 10px;
  position: fixed;
  top: 0;
  right: 113px;
  z-index: 99;
}
.particles {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
}
// .music {
//   margin-right: 80px;
//   position: fixed;
//   z-index: 99;
//   top: 14px;
//   right: -25px;
// }
// @-webkit-keyframes rotation {
//   from {
//     -webkit-transform: rotate(0deg);
//   }
//   to {
//     -webkit-transform: rotate(360deg);
//   }
// }

// .rotation {
//   cursor: pointer;
//   -webkit-transform: rotate(360deg);
//   animation: rotation 8s linear infinite;
//   -moz-animation: rotation 8s linear infinite;
//   -webkit-animation: rotation 8s linear infinite;
//   -o-animation: rotation 8s linear infinite;
// }
</style>

