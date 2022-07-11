<template>
  <div>
    <template v-if="list.length > 0">
      <art-card v-for="item in list" :key="item.id" :item="item" />
    </template>
    <template v-else>
      <p class="tip">历史列表为空, 您还没有读过任何文章!</p>
    </template>
  </div>
</template>

<script>
import { getHistoryList } from "@/api/user";
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
    this.getHistoryList();
  },
  methods: {
    async getHistoryList() {
      const res = await getHistoryList(this.data);
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
