<template>
  <div class="dashboard-container">
    <h2 class="font-Black">欢迎进入后台管理系统</h2>
  </div>
</template>

<script>
import * as api from "@/api/api";

export default {
  components: {},
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.name = sessionStorage.getItem("name");
  },
  mounted() {},
  methods: {},
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
.card {
  width: 50%;
  background: #fff;
  color: #fff;
  border-radius: 10px;
  height: 300px;
}
</style>
<style>
.echarts {
  width: 100%;
  height: 500px;
}
</style>
