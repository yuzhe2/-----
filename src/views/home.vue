<template>
  <div class="page">
    <van-sticky>
      <div class="f-r f-a-c w100 font14" style="background-color:#fff">
        <van-search v-model="search" shape="round" placeholder="请输入医院名称查询" class="w100" title="标题" @input="getData" />
        <div class="font-black pr10 font-hidden t-c" style="width:70px" v-if="!loginimg" @click="$router.push('/mylogin')">登录</div>
        <img :src="loginimg" class="font-black font-hidden mr10" style="min-width:40px;max-width:40px;min-height:40px;max-height:40px;border-radius:50%" v-else @click="$router.push('/my')" />
      </div>
    </van-sticky>

    <div class="row f-r f-a-c m10 font15 mb20 border-b1 pb20" v-for="(items,indexs) in list" :key="indexs" @click="$router.push('/detail?id='+items.id)">
      <img :src="items.img" class="head" style="width:50px;height:50px;border-radius:50%;object-fit:cover" @click="talk(items)">
      <div class="right ml10 p-r">
        <div class="name">{{items.name}}</div>
        <div class="p-a font-grey font12 t-r w100">联系电话: {{items.tel}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import * as api from "@/api/api";
import { ImagePreview } from "vant";

export default {
  components: {},
  data() {
    return {
      search: "",
      show: false,
      id: "",
      content: "",
      list: [],
      time: null,
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  watch: {},
  beforeDestroy() {},
  computed: {
    loginimg() {
      return sessionStorage.getItem("img") || false;
    },
  },
  watch: {},
  methods: {
    // 查看大图
    look(img) {
      ImagePreview([img]);
    },

    //获取列表
    getData() {
      api
        .adminlist({
          limit: 999,
          offset: 1,
          search: this.search,
        })
        .then((res) => {
          this.list = res.data.list;
        });
    },
  },
};
</script>

<style lang='less' scoped>
.page {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 60px;
}
.van-search__content {
  border-radius: 20px;
}
.row {
  .head {
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
  }
  .right {
    word-break: break-all;
    width: 100%;
    .name {
      color: #576b95;
    }
    .imgs {
      display: grid;
      grid-template-columns: repeat(3, calc(33.33% - 2.5px));
      grid-gap: 5px 5px;
      img {
        width: 100%;
        min-height: 100px;
        max-height: 100px;
        object-fit: cover;
      }
    }

    .commit {
      background-color: #f7f7f7;
      .commit-row:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
::v-deep .van-dialog__cancel {
  background-color: #fff;
  color: black;
}
::v-deep .van-dialog__confirm {
  background-color: #fff;
  color: black;
}
</style>