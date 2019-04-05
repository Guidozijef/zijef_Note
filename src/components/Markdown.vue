<template>
  <div class="write-container">
    <input class="input" type="text" v-model="input" placeholder="请输入标题">
    <div id="editor">
      <mavon-editor
        style="height: 100%"
        :ishljs="true"
        :externalLink="false"
        ref="md"
        @save="$save"
        v-model="md"
      ></mavon-editor>
    </div>
    <!-- <el-button :plain="true" @click="open6">成功</el-button> -->
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import highlight from "highlight.js";
import "mavon-editor/dist/css/index.css";
// import "../assets/css/atom-one-dark.css";

export default {
  name: "editor",
  components: {
    mavonEditor
  },
  data() {
    return {
      input: "",
      $message: "",
      md: ""
    };
  },
  created() {
    if (this.$route.params.id) {
      //  循环查找跟传入id对应的那条数据，并将找到的数据渲染到页面中
      this.$store.state.list.some(item => {
        if (this.$route.params.id == item.time) {
          // console.log(this.$route.params.id)
          this.input = item.title;
          this.md = item.content;
          return;
        }
      });
    }
  },
  methods: {
    $save() {
      // console.log(this.$refs.md.d_value); // 直接保存为markdown语法
      // console.log(this.$refs.md.d_render); // 获取编写的markdown的html内容
      // 构造每个文章对象
      var info = {
        title: this.input,
        time: Date.parse(new Date()),
        content: this.$refs.md.d_value // 获取编写的markdown内容
        // content: this.$refs.md.d_render, // 获取编写的markdown的html内容
      };
      // 调用 store 中的 mutations 来保存到 store 的 list 中
      if (info.title == "") {
        this.open4(); // 标题为空弹出错误提示
      } else if (info.content == "") {
        this.open5(); // 内容为空弹出错误提示

        // 如果有传递参数表示为编辑文章，否则为新增文章
      } else if (this.$route.params.id) {
        var localStorage_list = JSON.parse(localStorage.getItem("list"));
        localStorage_list.forEach((item, Index) => {
          if (item.time == this.$route.params.id) {
            info.imgValue = item.imgValue,
            info.bgValue = item.bgValue,
            localStorage_list.splice(Index, 1);
          }
        });
        localStorage_list.unshift(info);
        localStorage.setItem("list", JSON.stringify(localStorage_list));
        // // 请求最新数据到store中， 并更新渲染
        // var list = JSON.parse(localStorage.getItem("list") || "[]");
        // this.$store.state.list = list;
        this.open6();
      } else {
        info.imgValue = 776,
        info.bgValue = 776
        this.$store.commit("addToList", info); // 将数据添加到store
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
  }
};
</script>
<style lang="scss" scoped>
.write-container {
  width: 100%;
  overflow-y: hidden;
  .input {
    border: none;
    margin: 0 auto;
    width: 100%;
    height: 80px;
    padding-left: 30px;
    font-size: 30px;
    font-weight: 600;
    outline: none; /* 去掉input框获取焦点 */
  }
  #editor {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
  .v-note-show {
    background-color: "#F9FAFB";
  }
}
</style>
