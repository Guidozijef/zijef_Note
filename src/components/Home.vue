<template>
  <div class="home-container">
    <div class="box">
      <div
        class="cover-box"
        v-for="item in $store.state.list"
        :key="item.time"
        @click="goPage(item.time)"
      >
        <img src="https://ss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin_plus/875.jpg?2" alt>
        <span class="title">{{ item.title }}</span>
        <span class="time">{{ item.time | dateFormat }}</span>
        <!-- <div class="markdown-body" v-html="item.content"></div> -->
      </div>
    </div>
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
  overflow: hidden;
  .box {
    width: 90%;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .cover-box {
      overflow: hidden;
      cursor: pointer;
      float: left;
      margin: 20px;
      // border: 1px solid #000;
      width: 260px;
      height: 250px;
      background-color: #fff;
      border-radius: 5px;
      img {
        border-radius: 5px 5px 0 0;
        transition: all 0.5s ease;
        &:hover {
          transform: scale(1.02);
        }
      }
      .title {
        display: block;
        height: 21px;
        margin: 15px;
        font-family: "Mricosoft Yahei";
        font-size: 16px;
        font-weight: 700;
        overflow: hidden;
      }
      .time {
        float: right;
        margin-right: 15px;
        font-size: 14px;
        color: #c0c4cc;
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

