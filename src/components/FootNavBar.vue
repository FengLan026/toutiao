<template>
  <div>
    <van-tabbar class="footer-bar" route fixed placeholder>
      <van-tabbar-item to="/index">
        <template v-slot:icon>
          <i class="iconfont icon-shouye"></i>
        </template>
        <span class="title">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/forum">
        <template v-slot:icon>
          <i class="iconfont icon-wenda"></i>
        </template>
        <span class="title">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template v-slot:icon>
          <i class="iconfont icon-shipin"></i>
        </template>
        <span class="title">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template v-slot:icon>
          <i class="iconfont icon-wode"></i>
        </template>
        <span class="title">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.footer-bar {
  height: 50px;
  .iconfont {
    font-size: 20px;
  }
  .title {
    font-size: 10px;
  }
}
</style>
