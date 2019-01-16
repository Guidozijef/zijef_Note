<template>
  <div class="compile-container">
    <div class="title">
      <input class="input" type="text" v-model="input" placeholder="请输入标题">
      <el-button type="primary" class="save" @click="edit_save()">保存</el-button>
    </div>
    <div class="toolbar"></div>
    <div class="items">
      <textarea id="md" class="form-control" placeholder="请输入Markdown代码" v-model="context"></textarea>
      <div id="html" class="col-lg-6 col-sm-6 col-md-6" v-html="compiledMarkdown"></div>
      <!-- <div id="html" class="col-lg-6 col-sm-6 col-md-6" v-html="new_content" v-highlight></div> -->
    </div>
  </div>
</template>

<script>
//  导入marked进行编译文件
import marked from "marked";

export default {
  data() {
    return {
      old_content: "",
      input: "",
      new_content: "",
      context: ""
    };
  },
  created() {
    //  循环查找跟传入id对应的那条数据，并将找到的数据渲染到页面中
    this.$store.state.list.some(item => {
      if (item.time == this.$route.params.id) {
        this.input = item.title;
        // this.time = item.time;
        this.context = item.content;
        return;
      }
    });
    // console.log(this.$route.params.id); // 获取url传来的id值，即是传入的时间参数
  },
  methods: {
    edit_save() {
      // console.log(this.$refs.md.d_value); // 直接保存为markdown语法
      // console.log(this.$refs.md.d_render); // 获取编写的markdown的html内容
      var info = {
        title: this.input,
        time: Date.parse(new Date()),
        content: this.context
      };
      // 调用 store 中的 mutations 来保存到 store 的 list 中
      if (info.title == "") {
        this.open4(); // 标题为空弹出错误提示
      } else if (info.content == "") {
        this.open5(); // 内容为空弹出错误提示
      } else {
        var localStorage_list = JSON.parse(localStorage.getItem("list"));
        localStorage_list.forEach((item, Index) => {
          if (item.time == this.$route.params.id) {
            localStorage_list.splice(Index, 1);
          }
        });
        localStorage_list.unshift(info);
        localStorage.setItem("list", JSON.stringify(localStorage_list));
        // // 请求最新数据到store中， 并更新渲染
        // var list = JSON.parse(localStorage.getItem("list") || "[]");
        // this.$store.state.list = list;
        this.open6();
      }
    },
    // 弹框提示保存成功
    open6() {
      this.$message({
        showClose: true, // 控制弹框是否可关闭
        message: "保存成功！",
        type: "success"
      });
    },
    open4() {
      this.$message({
        showClose: true,
        message: "标题不能为空！",
        type: "error"
      });
    },
    open5() {
      this.$message({
        showClose: true,
        message: "内容不能为空！",
        type: "error"
      });
    }
  },
  // 传入md语法文件，并解析
  computed: {
    compiledMarkdown() {
      return marked(this.context, { sanitize: true });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/github-markdown.min.css"; //markdown样式文件
.compile-container {
  width: 100%;
  overflow-y: hidden;
  height: 100%;
  .title {
    // width: 100%;
    .input {
      border: none;
      margin: 0 auto;
      width: 97.8%;
      height: 80px;
      padding-left: 30px;
      font-size: 30px;
      font-weight: 600;
      outline: none; /* 去掉input框获取焦点 */
      background-color: #f5f5f5;
    }
    .save {
      position: absolute;
      top: 79px;
      right: 55px;
      // background-color: #ca0c16;
    }
  }
  .toolbar {
    width: 100%;
    height: 50px;
    background-color: #e0e0e0;
  }
  .items {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    #md,
    #html {
      height: 500px;
      width: 50%;
      padding: 15px;
      font-family: "Microsoft YaHei";
      border: none;
    }
    #md {
      float: left;
      font-size: 16px;
      background-color: #f5f5f5;
      outline: none; /* 去掉input框获取焦点 */
    }
    #html {
      overflow: auto;
      float: left;
      border: solid 1px rgb(233, 220, 220);
      background-color: #fff;
    }
  }
}
</style>

