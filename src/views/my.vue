<template>
  <div class="page">
    <div class="top f-c f-a-c f-j-c font-white">
      <img src="@/assets/my.jpg" class="my-bg">
      <img :src="img" class="head mb20">
      <div class="font16">{{name}}</div>
    </div>

    <div class="menu">
      <van-cell title="修改信息" is-link @click="$router.push('/editinfo')" />
      <van-cell title="我的预约" is-link @click="$router.push('/orders')" />
      <van-cell title="退出" is-link @click="loginout" />
    </div>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      name: "",
      img: "",
    };
  },
  created() {
    this.name = sessionStorage.getItem("name");
    this.img = sessionStorage.getItem("img");
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    // 退出
    loginout() {
      sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style lang='scss' scoped>
.page {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  .top {
    height: 230px;
    position: relative;
    .my-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .head {
      height: 70px;
      width: 70px;
      border-radius: 50%;
      border: 3px solid #ffffff80;
    }
  }
  .menu {
    background-color: #f8f8f8;
    height: 100%;
  }
}
</style>