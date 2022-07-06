<template>
  <div>
    <div class="header">
      <van-row type="flex" justify="space-between">
        <van-col span="8">
          <van-image
            round
            width="75px"
            height="75px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </van-col>
        <van-col span="4"> 未来科技无责任公司 </van-col>
        <van-col span="6">
          <van-button round type="mini">默认按钮</van-button>
        </van-col>
      </van-row>

      <van-tabbar :fixed="false">
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
    </div>
    <van-tabbar :fixed="false">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
    </van-tabbar>
    <van-cell title="单元格" is-link />
    <van-cell title="单元格" is-link />
    <van-button type="primary" block>块级元素</van-button>
    <foot-nav-bar></foot-nav-bar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
