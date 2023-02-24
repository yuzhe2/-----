<template>
  <div class="dashboard-container">
    <el-form ref="searchForm" :model="searchForm" inline size="medium" class="searchForm" label-width="80px">
      <el-form-item label="名称:">
        <el-input v-model="searchForm.name" placeholder="" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData()" icon="el-icon-search">查询</el-button>
        <el-button @click="showDialog = true" icon="el-icon-plus" plain>新增</el-button>
      </el-form-item>
    </el-form>

    <el-card slot class="content-card" shadow="never">
      <el-table :data="list" stripe style="width: 100%; min-height: 60vh" border>
        <el-table-column label="序号" header-align="center" align="center" type="index" width="70" />
        <el-table-column prop="name" label="疫苗名称" header-align="center" align="center" />
        <el-table-column prop="addr" label="地点" header-align="center" align="center" />
        <el-table-column prop="num" label="每时间段可预约数量" header-align="center" align="center" />
        <el-table-column prop="type" label="类型" header-align="center" align="center" />
        <el-table-column prop="aname" label="关联医疗机构" header-align="center" align="center" />
        <el-table-column prop="time" label="时间" header-align="center" align="center" />
        <el-table-column prop="address" label="操作" header-align="center" align="center" width="190px">
          <template slot-scope="scope">
            <div>
              <a style="margin-left: 20px; color: rgb(31, 144, 254)" @click="edit(scope.row)">编辑</a>
              <a style="margin-left: 20px; color: rgb(31, 144, 254)" @click="del(scope.row)">删除</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :limit.sync="limit" :total="total" :offset.sync="offset" :hidden="hidden" @changePage="getData" />
    </el-card>

    <!-- 增加编辑 -->
    <Dialog :showDialog.sync="showDialog" title="" :appendBody="true" @cancal="close" @confirm="confirm" width="900">
      <div slot>
        <el-form ref="addForm" :model="addForm" label-width="150px" class="addForm" label-position="left" size="small">
          <el-form-item label="疫苗名称:">
            <el-input v-model="addForm.name" placeholder="请输入疫苗名称"></el-input>
          </el-form-item>
          <el-form-item label="每时间段可预约数量:">
            <el-input v-model="addForm.num" placeholder="请输入每时间段可预约数量"></el-input>
          </el-form-item>
          <el-form-item label="类型:">
            <el-select v-model="addForm.type" placeholder="请选择类型" class="w100">
              <el-option label="第一针" value="第一针"></el-option>
              <el-option label="第二针" value="第二针"></el-option>
              <el-option label="第三针" value="第三针"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择医疗机构:" v-if="!aid">
            <el-select v-model="addForm.aid" placeholder="请选择选择" class="w100">
              <el-option v-for="item in adminList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可预约时间段:">
            <el-select v-model="addForm.timelist" multiple placeholder="请选择可预约时间段" class="w100">
              <el-option label="09:00-10:00" value="09:00-10:00"></el-option>
              <el-option label="11:00-12:00" value="11:00-12:00"></el-option>
              <el-option label="15:00-16:00" value="15:00-16:00"></el-option>
              <el-option label="17:00-18:00" value="17:00-18:00"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地点:">
            <el-input v-model="addForm.addr" placeholder="请输入地点" type="textarea" rows="5"></el-input>
          </el-form-item>
          <el-form-item label="简介:">
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
        addr: "",
        type:"第一针",
        content: "",
        timelist: [],
        num: "",
        aid: "",
      },
      aid: "",
      list: [],
      adminList: [],
      showDialog: false,
    };
  },
  created() {
    this.aid = sessionStorage.getItem("id") || "";
    this.addForm.aid = this.aid
    this.getData();
    this.getAdmin();
  },
  methods: {
    //大图上传
    imgSuccess(file) {
      this.addForm.img = file.data;
    },

    //获取列表
    getAdmin() {
      api
        .adminlist({
          offset: 1,
          limit: 999,
        })
        .then((res) => {
          if (res.code == 200) {
            this.adminList = res.data.list;
          }
        });
    },

    //获取列表
    getData() {
      api
        .vaccineslist({
          search: this.searchForm.name,
          offset: this.offset,
          limit: this.limit,
          aid: this.aid
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
    },

    //删除
    async del(item) {
      await api
        .vaccinesdel({
          id: item.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("操作成功!");
          } else {
            this.$message.error(res.msg);
          }
        });

      await this.getData();
    },

    // 新增/编辑-提交
    async confirm() {
      //验证是否填入所有信息
      try {
        if (!this.addForm.timelist.length) {
          throw new Error("请填写选择可预约时间段");
        }
        Object.keys(this.addForm).forEach((k) => {
          if (this.addForm[k] == "" && k != "timelist") {
            throw new Error("请填写所有信息");
          }
        });
      } catch (err) {
        this.$message.error("请填写所有信息");
        return;
      }

      await api
        .vaccinessave({
          ...this.addForm,
          timelist: this.addForm.timelist.join(","),
          aid: this.addForm.aid || this.aid,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("操作成功!");
            this.showDialog = false;
          } else {
            this.$message.error(res.msg);
          }
        });

      await this.getData();
    },

    //编辑
    edit(item) {
      this.addForm = JSON.parse(JSON.stringify(item)); //对象拷贝防止重置对象时污染
      this.addForm.timelist = this.addForm.timelist.split(",");
      this.addForm.aid = Number(this.addForm.aid);
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
  object-fit: cover;
}


</style>
