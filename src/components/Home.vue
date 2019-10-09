<template>
  <div class="home-container">
    <div class="box">
      <div
        class="cover-box"
        v-for="item in $store.state.list"
        :key="item.time"
        @click="goPage(item.time)"
      >
        <img
          :src="'https://ss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin_plus/'+ (item.imgValue) + '.jpg?2'"
          alt
        >
        <span class="delete" @click="del(item.time)">
          <img src="../assets/images/错误.png" alt style="height:20px;">
        </span>
        <div class="title_box">
          <span class="title" :title="item.title">{{ item.title }}</span>
          <span class="time">{{ item.time | dateFormat }}</span>
        </div>
        <!-- <div class="markdown-body" v-html="item.content"></div> -->
      </div>
    </div>
    <!-- 删除提示弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>内容删除后不可回收，你确定？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
        <el-button type="primary" @click="sureDel()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false, // 控制删除提示框
      delTime: ""
    };
  },
  methods: {
    goPage(id) {
      this.$router.push({ name: "page", params: { id } });
    },
    del(delTime, event) {
      this.delTime = delTime;
      // 阻止事件冒泡
      event = event || window.event;
      // （火狐、谷歌、IE11)
      if (event && event.stopPropagation) {
        event.stopPropagation();
      } else {
        // IE10以下
        event.cancelBubble = true;
      }
      this.dialogVisible = true; // 显示删除提示框
    },
    sureDel() {
      var localStorage_list = JSON.parse(localStorage.getItem("list"));
      localStorage_list.forEach((item, Index) => {
        if (item.time == this.delTime) {
          localStorage_list.splice(Index, 1);
        }
      });

      localStorage.setItem("list", JSON.stringify(localStorage_list));
      // 删除完成后马上更新 localStorage 中的 list 文章列表
      this.$store.state.list = JSON.parse(localStorage.getItem("list"));
      this.dialogVisible = false;
      this.open6();
    },
    // 弹框提示保存成功
    open6() {
      this.$message({
        showClose: true, // 控制弹框是否可关闭
        message: "删除成功！",
        type: "success"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home-container {
  overflow: hidden;
  .box {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .cover-box {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      float: left;
      margin: 20px;
      // border: 1px solid #000;
      width: 260px;
      background-color: #fff;
      border-radius: 5px;
      img {
        border-radius: 5px 5px 0 0;
        transition: all 0.5s ease;
        &:hover {
          transform: scale(1.1);
        }
      }
      .delete {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 90;
      }
      .title_box {
        background-color: rgba(32, 33, 36, 0.71);
        position: absolute;
        bottom: 0;
        left: 0;
        display: inline-block;
        font-size: 13px;
        height: 40px;
        width: 260px;
        line-height: 40px;
        .title {
          width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-left: 10px;
          white-space: nowrap;
          display: inline-block;
          color: #fff;
          font-family: "Mricosoft Yahei";
          font-size: 14px;
        }
        .time {
          float: right;
          margin-right: 10px;
          font-size: 10px;
          color: #928686;
        }
      }
    }
  }

  // .markdown-body {
  //   width: 674px;
  //   // height: 200px
  //   word-break: break-all;
  //   text-overflow: ellipsis;
  //   display: -webkit-box; /** 将对象作为伸缩盒子模型显示 **/
  //   -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  //   -webkit-line-clamp: 3; /** 显示的行数 **/
  //   overflow: hidden; /** 隐藏超出的内容 **/
  //   // white-space: nowrap;
  // }
}
</style>

