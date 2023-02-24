<template>
  <div>
    <van-field v-model="userInfo.user" :border="false" label="账号" placeholder="请输入账号" :disabled="true" />
    <van-field v-model="userInfo.pwd" type="password" :border="false" label="密码" placeholder="请输入密码" />
    <van-field v-model="userInfo.tel" :border="false" label="手机号" placeholder="请输入手机号" />
    <van-field v-model="userInfo.name" :border="false" label="名称" placeholder="请输入名称" />
    <van-field v-model="userInfo.cardid" :border="false" label="身份证号" placeholder="请输入身份证号" />
    <div class="mt30 w100">
        <van-button type="default w100" @click="edit">修改</van-button>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";

export default {
  name: 'my',
  data () {
    return {
      userInfo: {
        cardid: '',
        id: '',
        name: '',
        pwd: '',
        user: '',
        tel: ''
      }
    }
  },
  methods: {
    edit () {
      try {
        Object.keys(this.userInfo).forEach((k) => {
          if (!this.userInfo[k]) {
            throw new Error();
          }
        });
      } catch (error) {
        this.$toast("请输入所有信息");
        return;
      }

      api.usersave(this.userInfo).then((res) => {
        if (res.code == 200) {
          this.$toast("修改成功");
        }
      });
    }
  },
  created () {
    let userArr = ['cardid', 'id', 'name', 'pwd', 'user', 'tel']
      userArr = userArr.map(val => `care${val}`)
    for (let i = 0; i < userArr.length; i++) {
      this.userInfo[userArr[i].slice(4)] = sessionStorage.getItem(userArr[i])
    }
    console.log(this.userInfo)
  }
}
</script>
