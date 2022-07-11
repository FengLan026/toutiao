<template>
  <div>
    <header-back-bar backPath="/my" />
    <van-tabs v-model="active" route>
      <van-tab title="我的收藏" name="collections" to="/info/collections" />
      <van-tab title="我的历史" name="history" to="/info/history" />
    </van-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "collections",
    };
  },
  created() {
    this.active = this.$route.query.active;
  },
};
</script>

<style lang="less" scoped>
</style>
