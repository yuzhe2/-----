<template>
  <div class="orders">
    <van-sticky>
      <van-nav-bar left-text="返回" :title="$route.meta.title" left-arrow @click-left="$router.go(-1)" />
      <van-tabs v-model="status" @change="getData" color="#1989fa">
        <van-tab title="全部" name=""></van-tab>
        <van-tab title="未完成" name="未完成"></van-tab>
        <van-tab title="已完成" name="已完成"></van-tab>
        <van-tab title="已退" name="已退"></van-tab>
        <van-tab title="已作废" name="已作废"></van-tab>
      </van-tabs>
    </van-sticky>

    <div class="p15 page">
      <div class="card mb20" v-for="(item,index) in list" :key="index">
        <div class="f-r f-a-c f-j-s">
          <div class="font-grey font15 mr5">预约时间: {{item.day}} {{item.booktime}}</div>
          <van-tag type="primary" v-if="item.status=='未完成'">未完成</van-tag>
          <van-tag type="success" v-if="item.status=='已完成'">已完成</van-tag>
          <van-tag type="warning" v-if="item.status=='已退'">已退</van-tag>
          <van-tag type="danger" v-if="item.status=='已作废'">已作废</van-tag>
        </div>
        <van-divider />
        <div class="f-r f-a-c f-j-s font14 mb20">
          <div>预约疫苗</div>
          <div>{{item.vname}}</div>
        </div>
        <div class="f-r f-a-c f-j-s font14 mb20">
          <div>接种机构</div>
          <div>{{item.aname}}</div>
        </div>
        <div class="f-r f-a-c f-j-s font14 mb20">
          <div>机构电话</div>
          <div>{{item.atel}}</div>
        </div>
        <div class="f-r f-a-c f-j-s font14 mb20">
          <div>接种地址</div>
          <div>{{item.vaddr}}</div>
        </div>
        <div class="f-r f-a-c f-j-s font14 mb20">
          <div>预约人</div>
          <div>{{item.uname}}</div>
        </div>
        <div class="f-r f-a-c f-j-s font14">
          <div>身份证号</div>
          <div>{{item.ucardid}}</div>
        </div>

        <div class="font-w600 t-r font30 mt50" v-if="item.status=='未完成' && !item.isover">
          <div class="">
            <van-button size="small" type="info" @click="over(item)">取消预约</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api";
export default {
  components: {},
  data() {
    return {
      status: "",
      list: [],
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    // 取消预约
    over(e) {
      api
        .orderssave({
          id: e.id,
          status: "已退",
        })
        .then((res) => {
          this.$toast("取消预约成功!");
          this.getData();
        });
    },

    getData() {
      api
        .orderslist({
          offset: 1,
          limit: 999,
          uid: sessionStorage.getItem("id"),
          status: this.status,
        })
        .then((res) => {
          let newarr = [];
          if (res.data.list.length != 0) {
            newarr = res.data.list.sort((a, b) => {
              return b.id - a.id;
            });
          }
          this.list = newarr.map((i) => {
            return {
              ...i,
              isover:
                this.$moment(`${i.day} ${i.booktime.split("-")[1]}`).valueOf() <
                this.$moment().valueOf()
                  ? true
                  : false,
            };
          });
        });
    },
  },
  computed: {},
  watch: {},
  beforeDestroy() {},
};
</script>

<style lang='scss' scoped>
.orders {
}
.page {
  min-height: 100vh;
  background: #f7f7f7;
}
.card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
}

.card image {
  min-width: 70px;
  max-width: 70px;
  min-height: 70px;
  max-height: 70px;
  border-radius: 10px;
}
</style>