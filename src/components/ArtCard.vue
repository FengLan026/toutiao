<template>
  <div class="art-item" @click="getArticlesDetail(item.art_id)">
    <h3 class="art-title" v-if="item.cover.type != 1">
      {{ item.title }}
    </h3>
    <div class="art-img-type-1" v-if="item.cover.type == 1">
      <h3 class="art-title">{{ item.title }}</h3>
      <img class="art-cover" :src="item.cover.images[0]" alt="" />
    </div>
    <div class="art-img-type-3" v-else-if="item.cover.type == 3">
      <img class="art-cover" :src="item.cover.images[0]" alt="" />
      <img class="art-cover" :src="item.cover.images[1]" alt="" />
      <img class="art-cover" :src="item.cover.images[2]" alt="" />
    </div>
    <div class="article-footer-info">
      <span class="art-name">{{ item.aut_name }}</span>
      <span class="art-comm">{{ item.comm_count }}评论</span>
      <span class="art-time">{{ item.pubdate }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // 获取文章详情 路由跳转
    async getArticlesDetail(id) {
      this.$router.push({
        path: "/art",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.art-item {
  background-color: #fff;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #edeff3;
  .art-title {
    margin: 0;
    margin-bottom: 20px;
    font-size: 16px;
    color: #3a3a3a;
  }
  .art-img-type-1 {
    position: relative;
    height: 80px;
    .art-title {
      width: 230px;
    }
    .art-cover {
      position: absolute;
      right: 0;
      top: 0;
      display: block;
      width: 116px;
      height: 73px;
    }
  }
  .art-img-type-3 {
    display: flex;
    justify-content: space-between;
    .art-cover {
      display: block;
      width: 116px;
      height: 73px;
    }
  }
  .article-footer-info {
    font-size: 12px;
    margin-top: 4px;
    color: #b4b4b4;
    span {
      margin: 0 2px;
    }
  }
}
</style>
