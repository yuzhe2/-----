<template>
  <div>
    <van-nav-bar left-text="返回" :title="$route.meta.title" left-arrow @click-left="$router.go(-1)" />
    <van-field v-model="form.content" type="textarea" rows="5" label="" placeholder="这一刻的想法......" :border="true" />
    <div class="p15" style="height:300px">
      <van-uploader v-model="fileList" :before-delete="beforeDelete" multiple :max-count="3" />
    </div>

    <div class="p15 w100">
      <van-button class="w100" @click="submit">发布</van-button>
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
        content: "",
      },
      fileList: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 删除图片
    beforeDelete(file, detail) {
      this.fileList.splice(detail.index, 1);
    },

    // 发布
    async submit() {
      if (!this.form.content) {
        this.$toast("请输入内容!");
        return;
      }
      if (!this.fileList.length) {
        this.$toast("请上传图片!");
        return;
      }
      let imgs = [];
      for (const key in this.fileList) {
        let { data } = await api.upload(this.fileList[key]["file"]);
        imgs.push(data);
      }
      
        api.talksave({
          content: this.form.content,
          uid: sessionStorage.getItem("id"),
          imgs: imgs.join(","),
        })
        .then((res) => {
          if (res.code == 200) {
            this.$toast("发布成功");
            this.form.content = "";
            this.fileList = [];
            setTimeout(() => {
              this.$router.push("/moments");
            }, 1000);
          }
        });
    },
  },
  computed: {},
  watch: {},
  beforeDestroy() {},
};
</script>

<style lang='scss' scoped>
</style>