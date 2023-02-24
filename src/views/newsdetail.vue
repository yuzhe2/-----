<template>
  <div>
  <van-sticky>
    <van-nav-bar left-text="返回" title="详情" left-arrow @click-left="$router.go(-1)" />
    </van-sticky>
    <div class="t-c mt20 pl15 pr15">
      {{info.name}}
    </div>
    <div class="t-r pr15 pt15 font14 font-grey">
      {{info.time}}
    </div>
    <div class="p15" v-html="info.content"></div>
  </div>
</template>

<script>
import * as api from "@/api/api";
export default {
  components: {},
  data() {
    return {
      info: {},
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      api
        .newslist({
          offset: 1,
          limit: 1,
          id: this.$route.query.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.info = res.data.list[0];
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