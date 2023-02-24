<template>
  <div>
  <van-sticky>
    <van-nav-bar left-text="返回" :title="info.name" left-arrow @click-left="$router.go(-1)" />
    <div class="p15 f-r f-a-c">
      <img :src="info.img" style="width:50px;height:50px;border-radius:50%;object-fit:cover">
      <div class="pl10 font18">{{info.name}}</div>
    </div>
    <van-cell-group class="border-b10">
      <van-cell title="联系电话" :value="info.tel" />
      <van-cell title="地址" :value="info.addr" />
    </van-cell-group>
    </van-sticky>
    
    <van-tabs v-model="active">
      <van-tab title="简介">
        <div class="p15" v-html="info.content">
        </div>
      </van-tab>
  
      <van-tab title="疫苗预约">
        <div class="p15">
          <van-radio-group v-model="type" @change="getVaccines" class="mb20">
            <div class="f-r f-a-c font14 f-j-s">
              <van-radio name="第一针">第一针</van-radio>
              <van-radio name="第二针">第二针</van-radio>
              <van-radio name="第三针">第三针</van-radio>
            </div>
          </van-radio-group>
          <div class="row mb15 f-r f-a-c border-b1 pb15 font15" v-for="item in vaccines" :key="item.id" @click="$router.push('/submit?vid='+item.id)">
            <div style="width:40px;height:40px;border-radius:50%;padding:10px;background:#ededed">
              <img src="@/assets/yimiao.png" class="w100 h100">
            </div>
            <div class="ml10">{{item.name}}</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

  </div>

</template>

<script>
import * as api from "@/api/api";
export default {
  components: {},
  data() {
    return {
      info: {},
      active: 0,
      type: "第一针",
      vaccines: [],
    };
  },
  created() {
    this.getData();
    this.getVaccines();
  },
  mounted() {},
  methods: {
    getData() {
      api
        .adminlist({
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

    // 获取疫苗
    getVaccines() {
      api
        .vaccineslist({
          offset: 1,
          limit: 999,
          aid: this.$route.query.id,
          type: this.type,
        })
        .then((res) => {
          if (res.code == 200) {
            this.vaccines = res.data.list;
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
table {
  border-spacing: 0;
  color: #666;
}
tr th {
  background: #f8f8f8;
  font-weight: 400;
  padding: 5px 0;
}

tr td {
  padding: 5px 0;
}
</style>