<template>
  <div class="page f-c f-a-c p40">
    <img src="@/assets/login.jpg">
    <van-field v-model="form.user" :border="false" left-icon="manager" label="账号" placeholder="请输入账号" />
    <van-field v-model="form.pwd" type="password" :border="false" left-icon="lock" label="密码" placeholder="请输入密码" />
    <div class="font10 font-grey t-r w100 mt10" @click="$router.push('/register')">没有账号?注册</div>
    <div class="mt30 w100">
      <van-button type="default w100" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";

export default {
  components: {},
  data() {
    return {
      form: {
        user: "",
        pwd: "",
      },
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    // 登录
    login() {
      try {
        Object.keys(this.form).forEach((k) => {
          if (!this.form[k]) {
            throw new Error();
          }
        });
      } catch (error) {
        this.$toast("请输入账号密码");
        return;
      }

      api
        .userlist({
          ...this.form,
          limit: 1,
          offset: 1,
        })
        .then((res) => {
          if (res.code == 200 && res.data.total) {
            Object.keys(res.data.list[0]).forEach((k) => {
              sessionStorage.setItem(k, res.data.list[0][k]);
            });
            sessionStorage.setItem("islogin", true);
            this.$toast("登录成功!");
            setTimeout(() => {
              this.$router.push("/");
              return;
            }, 500);
          } else {
            this.$toast("账号密码错误");
          }
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.page {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding-top: 30vh;
  img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
.van-cell {
  border-bottom: 1px solid #d1d1d1;
  padding: 10px 0;
  margin-bottom: 10px;
  background: #fff0;
  ::v-deep .van-cell__title {
    width: 40px;
  }
}
</style>