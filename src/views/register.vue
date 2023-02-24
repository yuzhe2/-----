<template>
  <div class="page f-c f-a-c pl40 pr40">
    <img src="@/assets/login.jpg">
    <van-uploader :after-read="afterRead" :fileList="fileList" max-count="1" class="mb10" />
    <van-field v-model="form.name" :border="false" label="姓名" placeholder="请输入姓名" />
    <van-field v-model="form.user" :border="false" label="账号" placeholder="请输入账号" />
    <van-field v-model="form.pwd" type="password" :border="false" label="密码" placeholder="请输入密码" />
    <van-field v-model="form.tel" :border="false" label="手机号" placeholder="请输入手机号" />
    <van-field v-model="form.cardid" :border="false" label="身份证号" placeholder="请输入身份证号" />
    <div class="font10 font-grey t-r w100 mt10" @click="$router.push('/mylogin')">已有账号?登录</div>
    <div class="mt30 w100">
      <van-button type="default w100" @click="register">注册</van-button>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      form: {
        user: "",
        pwd: "",
        img: "",
        name: "",
        tel: "",
        cardid: "",
      },
      fileList: [],
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    // 上传
    afterRead(file) {
      api.upload(file.file).then((res) => {
        this.form.img = res.data;
        this.fileList = [{ url: res.data }];
      });
    },

    register() {
      try {
        Object.keys(this.form).forEach((k) => {
          if (!this.form[k]) {
            throw new Error();
          }
        });
      } catch (error) {
        this.$toast("请输入所有信息");
        return;
      }

      api.usersave(this.form).then((res) => {
        if (res.code == 200) {
          this.$toast("注册成功!");
          setTimeout(() => {
            this.$router.push("/mylogin");
            return;
          }, 500);
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.page {
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  padding-top: 20px;
  padding-bottom: 20px;
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
    // width: 40px;
  }
}
</style>