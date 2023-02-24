<template>
  <div>
    <van-nav-bar left-text="返回" :title="info.name" left-arrow @click-left="$router.go(-1)" />
    <van-calendar :show-title="false" :poppable="false" :show-confirm="false" :style="{ height: '400px' }" @select="select" />

    <div class="grid p10">
      <div class="card f-c f-a-c f-j-c w100 font14" @click="booktime=item.booktime;num=item.num" :class="item.booktime==booktime?'card-active':''" v-for="(item,index) in vaccines" :key="index">
        <div class="mb5">{{item.booktime}}</div>
        <div>剩余:{{item.num}}</div>
      </div>
    </div>

    <div class="p10">
      <van-button type="primary" class="w100" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";
export default {
  components: {},
  data() {
    return {
      info: {},
      vaccines: [],
      day: "",
      booktime: "",
      num: 0,
    };
  },
  async created() {
    this.day = this.$moment().format("YYYY-MM-DD");
    this.getData();
  },
  mounted() {},
  methods: {
    // 提交
    submit() {
      if (this.booktime == "") {
        this.$toast("请选择预约时间");
        return;
      }
      if (this.num == 0) {
        this.$toast("该时间段没有疫苗");
        return;
      }
      api
        .orderssave({
          vid: this.$route.query.vid,
          booktime: this.booktime,
          day: this.day,
          aid: this.info.aid,
          uid: sessionStorage.getItem("id"),
          status: "未完成",
        })
        .then((res) => {
          if (res.code == 200) {
            this.$toast("预约成功");
            this.$router.go(-1);
          }
        });
    },

    // 获取疫苗详情
    async getData() {
      await api
        .vaccineslist({
          offset: 1,
          limit: 1,
          id: this.$route.query.vid,
        })
        .then((res) => {
          if (res.code == 200) {
            this.info = res.data.list[0];
            this.vaccines = this.info.timelist.split(",").map((i) => {
              return {
                booktime: i,
                num: this.info.num,
              };
            });
            this.booktime = this.vaccines[0].booktime;
            this.num = this.vaccines[0].num;
            this.getOders();
          }
        });
    },

    // 选中日期
    select(e) {
      this.day = this.$moment(e).format("YYYY-MM-DD");
      this.getData();
    },

    // 获取剩余疫苗
    getOders() {
      api
        .orderslist({
          offset: 1,
          limit: 999,
          day: this.day,
          vid: this.$route.query.vid,
        })
        .then((res) => {
          if (res.code == 200) {
            let list = this.vaccines;
            res.data.list.forEach((item) => {
              this.vaccines.forEach((i, k) => {
                if (i.booktime == item.booktime) {
                  list[k]["num"] -= 1;
                }
              });
            });

            this.vaccines = list;
            this.num = list[0]['num']
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
.grid {
  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 7px));
  grid-gap: 10px;
  .card {
    height: 60px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }
  .card-active {
    background-color: #1989fa;
    color: #fff;
  }
}
</style>