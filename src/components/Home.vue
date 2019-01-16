<template>
  <div class="home-container">
    <!-- <span>{{ $store.getters.getinfo.title }}</span> -->
    <!-- <span>{{ $store.state.list }}</span> -->
    <el-card class="box-card" v-for="item in $store.state.list" :key="item.time">
      <div slot="header" class="clearfix" @click="goPage(item.time)">
        <span class="title">{{ item.title }}</span>
        <span class="time">{{ item.time | dateFormat }}</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <!-- <div class="markdown-body" v-html="item.content"></div> -->
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goPage(id) {
      this.$router.push({ name: "page", params: { id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.home-container {
  .text {
    font-size: 30px;
    font-weight: 600;
  }
  .item {
    // margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    // display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .box-card {
    width: 50%;
    margin: 10px auto;
    // height: 147px;
    // overflow: hidden;

    .title {
      font-size: 22px;
      font-weight: 600;
    }
    .time {
      line-height: 59px;
      float: right;
      font-size: 12px;
      margin-right: 10px;
    }
    .el-card__body {
      padding: 0;
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
}
</style>

