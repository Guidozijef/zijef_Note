<template>
  <div class="page-container">
    <div class="bg">
      <img :src="'https://ss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/' + bgValue + '.jpg'">
    </div>
    <div class="tabs" @click.stop="addActive= !addActive">
      <dir class="changeSkin">换肤</dir>
    </div>
    <transition name="fade">
      <div class="img-box" v-show="addActive">
        <el-slider v-model="value2" :show-tooltip="false" @change="opacity"></el-slider>
        <ul class="nav-list">
          <li
            :class="{present:item.presentFalg}"
            v-for="(item, index) in barList"
            :key="index"
            @click="barTable(index)"
          >
            <span class="skinnav-nav-name">{{item.bar}}</span>
          </li>
        </ul>
        <ul class="img-list">
          <li v-for="img in skinList" :key="img.index" @click="saveImg(img.dataindex)">
            <img
              :src="'https://ss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin_plus/' + (img.dataindex) + '.jpg?2'"
              :title="img.filewriter"
            >
          </li>
        </ul>
      </div>
    </transition>
    <div class="main-box" :style="{opacity: opacityValue}">
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
// import "../../node_modules/highlight.js/styles/github.css";
import "../assets/css/atom-one-dark.css";

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
      content: "",
      addActive: false,
      skinList: [],
      bgValue: "",
      value2: 50,
      opacityValue: "",
      barList: [
        { bar: "热门", presentFalg: true, datalist: [] },
        { bar: "游戏", presentFalg: false, datalist: [] },
        { bar: "卡通", presentFalg: false, datalist: [] },
        { bar: "女神", presentFalg: false, datalist: [] },
        { bar: "明星", presentFalg: false, datalist: [] },
        { bar: "风景", presentFalg: false, datalist: [] },
        { bar: "简约", presentFalg: false, datalist: [] },
        { bar: "清新", presentFalg: false, datalist: [] }
      ],
    };
  },
  created() {
    //  循环查找跟传入id对应的那条数据，并将找到的数据渲染到页面中
    this.$store.state.list.some(item => {
      if (item.time == this.$route.params.id) {
        this.title = item.title;
        this.time = item.time;
        this.content = item.content;
        this.bgValue = item.bgValue;
        return;
      }
    });
    // console.log(this.$route.params.id); // 获取url传来的id值，即是传入的时间参数
    // 发送请求换肤的图片数据
    this.$axios
      .http({ type: "get", url: "classes/TestObject/5c3dfd0f44d904005d910cbc" })
      .then(res => {
        // console.log(res.data);
        var bginfo = res.data.bsResult.data;
        this.skinList = bginfo[0].bgitem;
        this.barList[0].datalist = bginfo[0].bgitem;
        this.barList[1].datalist = [
          ...bginfo[1].skinData[0].list,
          ...bginfo[1].skinData[1].list,
          ...bginfo[1].skinData[2].list,
          ...bginfo[1].skinData[3].list,
          ...bginfo[1].skinData[4].list,
          ...bginfo[1].skinData[5].list,
          ...bginfo[1].skinData[6].list
        ];
        this.barList[2].datalist = [
          ...bginfo[2].skinData[0].list,
          ...bginfo[2].skinData[1].list,
          ...bginfo[2].skinData[2].list
        ];
        this.barList[3].datalist = [
          ...bginfo[3].starData[0].list,
          ...bginfo[3].starData[1].list,
          ...bginfo[3].starData[2].list,
          ...bginfo[3].starData[3].list,
          ...bginfo[3].starData[4].list,
          ...bginfo[3].starData[5].list,
          ...bginfo[3].starData[6].list,
          ...bginfo[3].starData[7].list,
          ...bginfo[3].starData[8].list,
          ...bginfo[3].starData[9].list
        ];
        this.barList[4].datalist = [
          ...bginfo[4].starData[0].list,
          ...bginfo[4].starData[1].list,
          ...bginfo[4].starData[2].list,
          ...bginfo[4].starData[3].list,
          ...bginfo[4].starData[4].list,
          ...bginfo[4].starData[5].list,
          ...bginfo[4].starData[6].list,
          ...bginfo[4].starData[7].list,
          ...bginfo[4].starData[8].list,
          ...bginfo[4].starData[9].list
        ];
        this.barList[5].datalist = bginfo[5].bgitem;
        this.barList[6].datalist = bginfo[6].bgitem;
        this.barList[7].datalist = bginfo[7].bgitem;
      });
  },
  methods: {
    edit() {
      this.$router.push({ name: "markdownedit" });
    },
    saveImg(id) {
      this.bgValue = id;
      var localStorage_list = JSON.parse(localStorage.getItem("list"));
      localStorage_list.forEach((item, Index) => {
        if (item.time == this.$route.params.id) {
          item.imgValue = id;
          item.bgValue = id;
        }
      });
      // localStorage_list.unshift(info);
      localStorage.setItem("list", JSON.stringify(localStorage_list));
    },
    opacity(val) {
      this.opacityValue = val / 100;
    },
    barTable(index) {
      for (var i = 0; i < this.barList.length; i++) {
        this.barList[i].presentFalg = false;
        if (i == index) {
          this.barList[index].presentFalg = true;
          this.skinList = this.barList[index].datalist;
        }
      }
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
    // background: url("https://ss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/887.jpg")
    //   no-repeat 100% 100%;
    z-index: -1;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tabs {
    .changeSkin {
      position: fixed;
      top: 5px;
      right: 10px;
      margin-right: 20px;
      cursor: pointer;
      z-index: 99;
      font-size: 14px;
    }
  }
  .img-box {
    overflow: auto;
    margin-top: 60px;
    position: fixed;
    top: 0;
    right: 0px;
    width: 342px;
    height: 100%;
    background-color: #fff;
    z-index: 90;
    .nav-list {
      width: 100%;
      height: 50px;
      line-height: 50px;
      li {
        text-align: center;
        float: left;
        width: 42px;
        transition: all 0.5s ease;
        &:hover {
          background-color: #389cff;
          cursor: pointer;
          span {
            color: #fff;
          }
        }
      }
      .present {
        background-color: #389cff;
        span {
          color: #fff;
        }
      }
    }

    .img-list {
      li {
        width: 168px;
        float: right;
        &:hover {
          box-shadow: 0px 0px 20px #000000;
          z-index: 22;
        }
        img {
          width: 100%;
          cursor: pointer;
        }
      }
    }
  }
  .img-box::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }
  .img-box::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
  .img-box::-webkit-scrollbar-thumb {
    background-color: #409eff;
    border-radius: 5px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter,
  .fade-leave-to {
    transform: translatex(300px);
  }
  .main-box {
    margin-top: 60px;
    overflow: hidden;
    width: 70%;
    margin: 0 auto;
    background-color: #f9fafb;
    padding: 20px;
    // opacity: 0.5;
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


