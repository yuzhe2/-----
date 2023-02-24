<template>
  <div class="p10">
    <div class="row p10 border-b1 pb30 mb20" v-for="item in list" :key="item.id">
      <div class="f-r f-a-c mb10 font15">
        <img :src="item.uimg" style="width:50px;height:50px;">
        <span class="ml10" style="color:#576b95">{{item.uname}}</span>
      </div>
      <div class="right">
        <div class="mt10 mb10 font14">{{item.content}}</div>
        <div class="grid">
          <img :src="imgs" v-for="(imgs,index) in item.imgs" :key="index" style="width:100px;height:100px;" class="mr10">
        </div>
        <div class="mt10 font12 font-grey">{{item.time}}</div>
        <div class="f-r f-a-c f-j-r mt30">
          <van-icon name="more" color="#1989fa" @click="open(item.id)" />
        </div>

        <div class="commits mt10 pl15 pr15 pt15 pb5" v-if="item.commitlist.length">
          <div class="commits-row f-r mb15 p-r" v-for="(commit,index) in item.commitlist" :key="index">
            <img :src="commit.uimg" class="mr10" style="width:30px;height:30px;">
            <div class="p-r w100">
              <div class="font13 mb5" style="color:#576b95">{{commit.uname}}</div>
              <div class="font14">{{commit.content}}</div>
              <div class="p-a font12 font-grey" style="top:0;right:0">{{commit.time}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-dialog v-model="show" title="评论" show-cancel-button className="commit-dialog" @close="show=false;content=''" @confirm="confirm">
      <van-field v-model="content" label="" placeholder="请输入评论.." type="textarea" rows="4" />
    </van-dialog>

    <van-icon name="add" style="position: fixed; right:20px;bottom:80px;" size="30" color="#a1a1a1" @click="$router.push('/add')" />
  </div>
</template>

<script>
import * as api from "@/api/api";

export default {
  components: {},
  data() {
    return {
      list: [],
      show: false,
      content: "",
      tid: "",
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      api
        .talklist({
          offset: 1,
          limit: 999,
        })
        .then((res) => {
          this.list = res.data.list;
        });
    },

    // 打开评论
    open(tid) {
      this.show = true;
      this.tid = tid;
    },

    //提交评论
    confirm() {
      if (this.content.length == 0) {
        this.$toast("请输入评论内容");
        return;
      }
      api
        .commitssave({
          tid: this.tid,
          content: this.content,
          uid: sessionStorage.getItem("id"),
        })
        .then((res) => {
          this.$toast("评论成功");
          this.show = false;
          this.content = "";
          this.getData();
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
  text-overflow: ellipsis;
}

.commits {
  background: #f7f7f7;
}

.commit-dialog {
  ::v-deep .van-dialog__cancel {
    color: black;
    background: #fff;
  }
  ::v-deep .van-dialog__confirm {
    color: #1989fa;
    background: #fff;
  }
}
</style>