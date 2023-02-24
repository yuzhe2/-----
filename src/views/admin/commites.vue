<template>
  <Dialog :showDialog.sync="show" title="" @cancal="show=false" :showButton="false" width="900">
    <div class="dashboard-container">
      <el-card slot class="content-card" shadow="never">
        <el-table :data="list" border stripe style="width: 100%;min-height: 60vh;">
          <el-table-column label="序号" header-align="center" align="center" type="index" width="70">
          </el-table-column>
          <el-table-column prop="img" label="用户头像" header-align="center" align="center">
            <template slot-scope="scope">
              <div>
                <img :src="scope.row.uimg" style="width:50px;height:50px;border-radius:50%">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="uname" label="评论用户" header-align="center" align="center" />
          <el-table-column prop="content" label="内容" header-align="center" align="center" />
          <el-table-column prop="time" label="时间" header-align="center" align="center" />
          <el-table-column prop="address" label="操作" header-align="center" align="center" width="190px">
            <template slot-scope="scope">
              <a style="color:rgb(31, 144, 254);" @click="del(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <Pagination :limit.sync="limit" :total="total" :offset.sync="offset" :hidden="hidden" @changePage="getData" />
      </el-card>

    </div>
  </Dialog>
</template>

<script>
import Middle from "@/components/Middle/index.vue";
import Dialog from "@/components/Dialog/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import Enduit from "@/components/WangEnduit/index.vue";
import * as api from "@/api/api";

export default {
  components: { Middle, Dialog, Pagination, Enduit },
  data() {
    return {
      url: process.env.VUE_APP_BASE_FILE,
      offset: 1, //当前页
      limit: 10, //每页大小
      total: 0, //总记录数
      hidden: false, //分页是否隐藏
      showDialog: false,
      tid: "",
      show: false,
      list: [],
    };
  },
  created() {},
  watch: {},
  mounted() {},
  methods: {
    open(tid) {
      this.tid = tid;
      this.getData();
    },

    //获取列表
    getData() {
      api
        .commitslist({
          tid: this.tid,
          offset: this.offset,
          limit: this.limit,
        })
        .then((res) => {
          if (res.code == 200) {
            this.list = res.data.list;
            this.total = res.data.total;
            this.show = true;
          }
        });
    },

    //模态框-关闭
    close() {
      this.showDialog = false;
      let time = setTimeout(() => {
        this.resetData("addForm", this); //重置数据
      }, 300);
    },

    //删除
    async del(item) {
      await api
        .commitsdel({
          id: item.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("操作成功!");
          } else {
            this.$message.error(res.message);
          }
        });

      await this.getData();
    },

    // 新增/编辑-提交
    async confirm() {
      try {
        Object.keys(this.addForm).map((i) => {
          if (this.addForm[i] == "") {
            throw i;
          }
        });
      } catch (e) {
        this.$message.error("请填写所有信息!");
        return;
      }

      await api.commitssave(this.addForm).then((res) => {
        if (res.code == 200) {
          this.$message.success("操作成功!");
          this.showDialog = false;
        } else {
          this.$message.error(res.message);
        }
      });
      await this.getData();
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
>>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px #c7c7c7 dashed;
  border-radius: 10px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 178px;
  display: block;
  object-fit: cover;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 10px));
  grid-gap: 10px 10px;
}
</style>
