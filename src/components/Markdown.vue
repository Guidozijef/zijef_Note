<template>
  <div class="write-container">
    <input class="input" type="text" v-model="input" placeholder="请输入标题">
    <div id="editor">
      <mavon-editor style="height: 100%" :ishljs="true" ref="md" @save="$save"></mavon-editor>
    </div>
    <!-- <el-button :plain="true" @click="open6">成功</el-button> -->
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "editor",
  components: {
    mavonEditor
  },
  data() {
    return {
      input: "",
      $message: ""
    };
  },
  methods: {
    $save() {
      // console.log(this.$refs.md.d_value); // 直接保存为markdown语法
      // console.log(this.$refs.md.d_render); // 获取编写的markdown的html内容
      // 构造每个文章对象
      var info = {
        title: this.input,
        time: Date.parse(new Date()),
        content: this.$refs.md.d_value, // 获取编写的markdown的html内容
        // content: this.$refs.md.d_render // 获取编写的markdown的html内容
        imgValue: 776,
        bgValue: 776
      };
      // 调用 store 中的 mutations 来保存到 store 的 list 中
      if (info.title == "") {
        this.open4(); // 标题为空弹出错误提示
      } else if (info.content == "") {
        this.open5(); // 内容为空弹出错误提示
      } else {
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
    width: 97.8%;
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
}
</style>
