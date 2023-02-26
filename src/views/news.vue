<template>
  <div>
   <van-sticky>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="@/assets/bg1.jpg" class="w100" style="object-fit:cover;height:200px;">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/bg2.jpg" class="w100" style="object-fit:cover;height:200px;">
      </van-swipe-item>
    </van-swipe>

    <van-tabs v-model="type" @change="getData">
      <van-tab title="疫苗资讯" name="疫苗资讯" />
      <van-tab title="防疫咨询" name="防疫咨询" />
    </van-tabs>
    </van-sticky>
    <div class="mb60">
    <van-cell-group>
      <van-cell v-for="item in list" :key="item.id" @click="$router.push('/newsdetail?id='+item.id)" :title="item.name" :value="item.time">
        <template #icon>
          <img :src="item.img" style="width:50px;height:50px" class="mr10">
        </template>
      </van-cell>
    </van-cell-group>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";
export default {
  components: {},
  data() {
    return {
      list: [],
      type: "疫苗资讯",
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
          type: this.type,
          offset: 1,
          limit: 999,
        })
        .then((res) => {
          this.list = res.data.list;
        });
    },
  },
  computed: {},
  watch: {},
  beforeDestroy() {},
};
</script>

<style lang='scss' scoped>
::v-deep .van-cell__title {
  white-space: nowrap;
  overflow: hidden;
  line-height: 50px;
  text-overflow: ellipsis;
}
</style>