<template>
  <div class="dashboard-container">
    <el-form ref="searchForm" :model="searchForm" inline size="medium" class="searchForm" label-width="80px">
      <el-form-item label="名称">
      <el-input v-model="searchForm.name" placeholder="" style="width: 250px"></el-input>
        <el-button type="success"  @click="exportData" class="ml10">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData()" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-card slot class="content-card" shadow="never">
      <el-table :data="list" border stripe style="width: 100%;height: 70vh;overflow-y:scroll" row-key="code" >
        <el-table-column label="序号" header-align="center" align="center" type="index" width="70">
        </el-table-column>
        <el-table-column prop="vname" label="预约疫苗" header-align="center" align="center" />
        <el-table-column prop="aname" label="关联医疗结构" header-align="center" align="center" />
        <el-table-column prop="booktime" label="预约时间段" header-align="center" align="center" />
        <el-table-column prop="day" label="预约日期" header-align="center" align="center" />
        <el-table-column prop="uname" label="关联用户" header-align="center" align="center" />
        <el-table-column prop="ucardid" label="身份证号" header-align="center" align="center" />
        <el-table-column prop="status" label="状态" header-align="center" align="center" />
        <el-table-column prop="time" label="时间" header-align="center" align="center" />
        <el-table-column prop="address" label="操作" header-align="center" align="center" width="190px">
          <template slot-scope="scope">
            <div>
              <a style="color:rgb(31, 144, 254);" @click="del(scope.row.id)">删除</a>
              <a style="margin-left:20px;color:rgb(31, 144, 254);" @click="setissue(scope.row,'已完成')" v-show="scope.row.status=='未完成'">设置为已完成</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :limit.sync="limit" :total="total" :offset.sync="offset" :hidden="hidden" @changePage="getData" />
    </el-card>

  </div>
</template>

<script>
import Middle from "@/components/Middle/index.vue";
import Dialog from "@/components/Dialog/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import Enduit from "@/components/WangEnduit/index.vue";
import * as api from "@/api/api";
import XLSX from "xlsx";

export default {
  components: { Middle, Dialog, Pagination, Enduit },
  data() {
    return {
      url: process.env.VUE_APP_BASE_FILE,
      offset: 1, //当前页
      limit: 10, //每页大小
      total: 0, //总记录数
      hidden: false, //分页是否隐藏
      defaultCode: "", //默认展开的code
      searchForm: {
        name: "",
      },
      list: [],
      aid: "",
      showDialog: false,
    };
  },
  created() {
    this.aid = sessionStorage.getItem("id") || "";
    this.getData();
  },
  mounted() {},
  methods: {
    //获取列表
    getData() {
      api
        .orderslist({
          search: this.searchForm.name,
          offset: this.offset,
          limit: this.limit,
          aid: this.aid,
        })
        .then((res) => {
          if (res.code == 200) {
            this.list = res.data.list;
            this.total = res.data.total;
          }
        });
    },

    // 导出
    async exportData() {
      if (this.list.length == 0) {
        this.$message.error("没有数据可以导出!");
        return;
      }
      let list = [];
      await api
        .orderslist({
          aid: this.aid,
          offset: 1,
          limit: 99999,
        })
        .then((res) => {
          if (res.code == 200) {
            list = res.data.list;
          }
        });

      let aoa1 = [
        [
          "预约疫苗",
          "关联医疗结构",
          "预约时间段",
          "预约日期",
          "关联用户",
          "身份证号",
          "状态",
          "时间",
        ],
      ];
      list.forEach((i, k) => {
        let row = [
          i.vname,
          i.aname,
          i.booktime,
          i.day,
          i.uname,
          i.ucardid,
          i.status,
          i.time,
        ];
        aoa1.push(row);
      });

      let table1 = XLSX.utils.aoa_to_sheet(aoa1);
      // let table2 = XLSX.utils.aoa_to_sheet(aoa2);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, table1, "导出");
      // XLSX.utils.book_append_sheet(wb, table2, "sheet2");

      const workbookBlob = this.workbook2blob(wb);

      this.openDownloadDialog(workbookBlob, `导出.xlsx`);
    },

    // 生成blol
    workbook2blob(workbook) {
      // 生成excel的配置项
      let wopts = {
        // 要生成的文件类型
        bookType: "xlsx",
        // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        bookSST: false,
        type: "binary",
      };
      let wbout = XLSX.write(workbook, wopts);
      // 将字符串转ArrayBuffer
      function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
      let blob = new Blob([s2ab(wbout)], {
        type: "application/octet-stream",
      });
      return blob;
    },

    // 将blob对象创建bloburl，然后用a标签实现弹出下载框
    openDownloadDialog(blob, fileName) {
      if (typeof blob == "object" && blob instanceof Blob) {
        blob = URL.createObjectURL(blob); // 创建blob地址
      }
      let aLink = document.createElement("a");
      aLink.href = blob;
      // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
      aLink.download = fileName || "";
      aLink.click();
    },

    // 改变状态
    setissue(item, status) {
      api
        .orderssave({
          id: item.id,
          status: status,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("操作成功!");
            this.getData();
          } else {
            this.$message.error(res.message);
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
    async del(id) {
      await api
        .ordersdel({
          id: id,
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
  // border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
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

// .row {
//   background-color: #fff;
//   border-radius: 2px;
//   padding: 10px;
//   font-size: 15px;
//   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
// }
// .row-de {
//   img {
//     width: 100px;
//     height: 100px;
//   }
// }

// .row-de:not(:last-child) {
//   border-bottom: 1px #e3e3e3 solid;
//   padding-bottom: 10px;
//   margin-bottom: 10px;
// }

.title {
  width: 90%;
}
</style>
