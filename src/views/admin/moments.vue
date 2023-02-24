<template>
  <div class="dashboard-container">
    <el-form ref="searchForm" :model="searchForm" inline size="medium" class="searchForm" label-width="80px">
      <el-form-item label="用户名称:">
        <el-input v-model="searchForm.name" placeholder="" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData()" icon="el-icon-search">查询</el-button>
        <!-- <el-button @click="showDialog=true" icon="el-icon-plus" plain>新增</el-button> -->
      </el-form-item>
    </el-form>

    <el-card slot class="content-card" shadow="never">
      <el-table :data="list" border stripe style="width: 100%;min-height: 60vh;">
        <el-table-column label="序号" header-align="center" align="center" type="index" width="70">
        </el-table-column>
        <el-table-column prop="img" label="图片" header-align="center" align="center">
          <template slot-scope="scope">
            <div>
              <img v-for="(item,index) in scope.row.imgs" :key="index" :src="item" style="width:80px;height:80px;">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="img" label="用户头像" header-align="center" align="center">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.uimg" style="width:50px;height:50px;border-radius:50%">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="uname" label="发布用户" header-align="center" align="center" />
        <el-table-column prop="content" label="内容" header-align="center" align="center" />
        <el-table-column prop="time" label="时间" header-align="center" align="center" />
        <el-table-column prop="address" label="操作" header-align="center" align="center" width="190px">
          <template slot-scope="scope">
            <a style="color:rgb(31, 144, 254);" @click="$refs.commits.open(scope.row.id)">评论管理</a>
            <!-- <a style="margin-left:20px;color:rgb(31, 144, 254);" @click="edit(scope.row)">编辑</a> -->
            <a style="margin-left:20px;color:rgb(31, 144, 254);" @click="del(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :limit.sync="limit" :total="total" :offset.sync="offset" :hidden="hidden" @changePage="getData" />
    </el-card>

    <!-- 增加编辑 -->
    <Dialog :showDialog.sync="showDialog" title="" @cancal="close" @confirm="confirm">
      <div slot>
        <el-form ref="addForm" :model="addForm" label-width="120px" class="addForm" label-position="right" size="small">
          <el-form-item label="图片:">
            <div class="avatar-uploader">
              <div v-if="addForm.imgs" class="grid">
                <img :src="item" class="avatar" v-for="(item,index) in addForm.imgs" :key="index">
              </div>
              <i v-if="!addForm.imgs.length" class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-form-item>
          <el-form-item label="点赞数量:">
            <el-input v-model="addForm.start"></el-input>
          </el-form-item>
          <el-form-item label="内容:">
            <el-input v-model="addForm.content" type="textarea" rows="5"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>

    <Commits ref="commits" />
  </div>
</template>

<script>
import Middle from "@/components/Middle/index.vue";
import Dialog from "@/components/Dialog/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import Enduit from "@/components/WangEnduit/index.vue";
import Commits from "@/views/admin/commites";
import * as api from "@/api/api";

export default {
  components: { Middle, Dialog, Pagination, Enduit, Commits },
  data() {
    return {
      url: process.env.VUE_APP_BASE_FILE,
      offset: 1, //当前页
      limit: 10, //每页大小
      total: 0, //总记录数
      hidden: false, //分页是否隐藏
      show: false,
      mid: "",
      searchForm: {
        name: "",
      },
      addForm: {
        content: "",
        imgs: "",
        uid: "",
        start: "",
      },
      list: [],
      showDialog: false,
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    //大图上传
    imgSuccess(file) {
      this.addForm.img = file.data;
    },

    //获取列表
    getData() {
      api
        .talklist({
          search: this.searchForm.name,
          offset: this.offset,
          limit: this.limit,
        })
        .then((res) => {
          if (res.code == 200) {
            this.list = res.data.list;
            this.total = res.data.total;
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
        .talkdel({
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

      await api.talksave(this.addForm).then((res) => {
        if (res.code == 200) {
          this.$message.success("操作成功!");
          this.showDialog = false;
        } else {
          this.$message.error(res.message);
        }
      });
      await this.getData();
    },

    //编辑
    edit(item) {
      this.addForm = JSON.parse(JSON.stringify(item)); //对象拷贝防止重置对象时污染
      this.showDialog = true;
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
