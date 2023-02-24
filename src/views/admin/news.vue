<template>
  <div class="dashboard-container">
    <el-form ref="searchForm" :model="searchForm" inline size="medium" class="searchForm" label-width="80px">
      <el-form-item label="标题:">
        <el-input v-model="searchForm.name" placeholder="" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData()" icon="el-icon-search">查询</el-button>
        <el-button @click="showDialog=true" icon="el-icon-plus" plain>新增</el-button>
      </el-form-item>
    </el-form>

    <el-card slot class="content-card" shadow="never">
      <el-table :data="list" border stripe style="width: 100%;min-height: 60vh;">
        <el-table-column label="序号" header-align="center" align="center" type="index" width="70">
        </el-table-column>
        <el-table-column prop="img" label="图片" header-align="center" align="center">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.img" style="width:100px;height:100px;">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="标题" header-align="center" align="center" />
        <el-table-column prop="type" label="分类" header-align="center" align="center" />
        <el-table-column prop="time" label="时间" header-align="center" align="center" />
        <el-table-column prop="address" label="操作" header-align="center" align="center" width="190px">
          <template slot-scope="scope">
            <a style="color:rgb(31, 144, 254);" @click="edit(scope.row)">编辑</a>
            <a style="margin-left:20px;color:rgb(31, 144, 254);" @click="del(scope.row)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :limit.sync="limit" :total="total" :offset.sync="offset" :hidden="hidden" @changePage="getData" />
    </el-card>

    <!-- 增加编辑 -->
    <Dialog :showDialog.sync="showDialog" title="" @cancal="close" @confirm="confirm" width="900">
      <div slot>
        <el-form ref="addForm" :model="addForm" label-width="120px" class="addForm" label-position="right" size="small">
          <el-form-item label="图片:">
            <el-upload class="avatar-uploader" :action="url" :show-file-list="false" :on-success="imgSuccess" accept=".png,.jpg,.jpeg">
              <img v-if="addForm.img" :src="addForm.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类:">
            <el-select v-model="addForm.type" placeholder="请选择分类" class="w100">
              <el-option label="新冠疫苗资讯" value="新冠疫苗资讯"></el-option>
              <el-option label="HPV疫苗资讯" value="HPV疫苗资讯"></el-option>
              <el-option label="儿童疫苗资讯" value="儿童疫苗资讯"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题:">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="内容:">
            <Enduit v-model="addForm.content"></Enduit>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>

  </div>
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
      searchForm: {
        name: "",
      },
      addForm: {
        name: "",
        type:"新冠疫苗资讯",
        content: "",
        img: "",
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
        .newslist({
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
        .newsdel({
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

      await api.newssave(this.addForm).then((res) => {
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
  width: 178px;
  height: 178px;
  display: block;
}
</style>
