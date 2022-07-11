<template>
  <div>
    <template v-if="list.length > 0">
      <art-card v-for="item in list" :key="item.id" :item="item" />
    </template>
    <template v-else>
      <p class="tip">收藏列表为空, 快把您喜欢的文章点上小星星吧!</p>
    </template>
  </div>
</template>

<script>
import { getCollectionsList } from "@/api/user";
export default {
  data() {
    return {
      list: [],
      data: {
        page: 1,
        per_page: 10,
      },
    };
  },
  created() {
    this.getCollectionsList();
  },
  methods: {
    async getCollectionsList() {
      const res = await getCollectionsList(this.data);
      console.log(res);
      this.list = res.results;
    },
  },
};
</script>

<style lang="less" scoped>
.tip {
  color: rgba(0, 0, 0, 0.3);
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}
</style>
