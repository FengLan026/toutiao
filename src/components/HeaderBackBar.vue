<template>
  <van-nav-bar fixed placeholder class="header" @click-left="leftBtn">
    <template v-slot:right>
      <van-icon color="#fff" size="25" name="ellipsis" />
    </template>
    <template v-slot:left>
      <van-icon color="#fff" size="20" name="arrow-left" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  props: ["backPath"],
  methods: {
    leftBtn() {
      // 如果传参 跳转到指定路径; 如果不传参 返回
      if (this.backPath) {
        this.$router.push(this.backPath);
      } else {
        this.$router.back();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 375px;
  height: 44px;
  /deep/.van-nav-bar {
    background-color: #3296fa;
  }
}
</style>
