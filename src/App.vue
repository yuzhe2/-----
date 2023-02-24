<template>
  <div id="app">
    <router-view />

    <Tabbar v-if="showTabbar" />
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
export default {
  components: { Tabbar },
  name: "App",
  computed: {
    //判断是否显示
    showTabbar() {
      let isMobile = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return isMobile && this.$route.meta.showTabbar;
    }
  },
  watch: {}
};
</script>
