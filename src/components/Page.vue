<template>
  <div class="page-container">
    <div class="bg"></div>
    <div class="main-box">
      <div class="edit" @click="edit()">
        <i
          class="iconfont icon-combinedshapecopy2"
          style="fontSize:22px;cursor:pointer;color:#5E5E5E;"
          title="编辑"
        ></i>
      </div>
      <div class="title" v-html="title"></div>
      <div class="time">{{ this.time | dateFormat }}</div>
      <!-- <br> -->
      <hr>
      <div class="items markdown-body" v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
import highlight from "highlight.js";
import "../../node_modules/highlight.js/styles/github.css";

marked.setOptions({
  highlight(code) {
    return highlight.highlightAuto(code).value;
  }
});

export default {
  data() {
    return {
      title: "",
      time: "",
      content: ""
    };
  },
  created() {
    //  循环查找跟传入id对应的那条数据，并将找到的数据渲染到页面中
    this.$store.state.list.some(item => {
      if (item.time == this.$route.params.id) {
        this.title = item.title;
        this.time = item.time;
        this.content = item.content;
        return;
      }
    });
    // console.log(this.$route.params.id); // 获取url传来的id值，即是传入的时间参数
  },
  methods: {
    edit() {
      this.$router.push({ name: "compile" });
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content, { sanitize: true });
    }
  }
};
</script>
<style lang="scss" scoped>
// @import url("https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css");
.page-container {
  width: 100%;
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    // background-color: gold;
    z-index: -1;
  }
  .main-box {
    overflow: hidden;
    width: 70%;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    .edit {
      float: right;
    }
    .title {
      font-size: 30px;
      font-weight: 600;
      text-align: center;
      padding-bottom: 10px;
    }
    .time {
      font-size: 14px;
      float: right;
    }
    .content {
      font-family: "Microsoft YaHei";
      overflow: auto;
    }
  }
}
</style>


