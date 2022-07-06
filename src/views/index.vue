<template>
  <div>
    <van-search
      class="search-nav"
      shape="round"
      input-align="center"
      v-model="value"
      placeholder="搜索"
    >
      <template v-slot:lable>
        <van-icon name="search" />
      </template>
    </van-search>
    <foot-nav-bar></foot-nav-bar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.search-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  padding: 0 50px;
}
</style>
