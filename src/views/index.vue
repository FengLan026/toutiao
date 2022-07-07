<template>
  <div>
    <div class="header">
      <van-search
        class="search-nav"
        shape="round"
        input-align="center"
        background="#3296fa"
        placeholder="搜索"
        @input="showIcon = false"
        @blur="showIcon = true"
      >
        <template v-slot:left-icon>
          <van-icon name="search" v-show="showIcon" />
        </template>
      </van-search>
    </div>
    <div class="container">
      <van-tabs v-model="active" @change="changeChannels(active)">
        <van-tab
          class="art-list"
          :title="item.name"
          v-for="item in channelsList"
          :key="item.id"
          :name="item.id"
          to=""
        >
          <div
            class="art-item"
            v-for="el in articlesList"
            :key="el.art_id"
            @click="getArticlesDetail(el.art_id)"
          >
            <h3 class="art-title" v-if="el.cover.type != 1">
              {{ el.title }}
            </h3>
            <div class="art-img-type-1" v-if="el.cover.type == 1">
              <h3 class="art-title">{{ el.title }}</h3>
              <img class="art-cover" :src="el.cover.images[0]" alt="" />
            </div>
            <div class="art-img-type-3" v-else-if="el.cover.type == 3">
              <img class="art-cover" :src="el.cover.images[0]" alt="" />
              <img class="art-cover" :src="el.cover.images[1]" alt="" />
              <img class="art-cover" :src="el.cover.images[2]" alt="" />
            </div>
            <div class="article-footer-info">
              <span class="art-name">{{ el.aut_name }}</span>
              <span class="art-comm">{{ el.comm_count }}评论</span>
              <span class="art-time">{{ el.pubdate }}</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <foot-nav-bar></foot-nav-bar>
  </div>
</template>

<script>
import {
  getChannelsList,
  getArticlesList,
  getArticlesDetail,
} from "@/api/channels";
export default {
  data() {
    return {
      showIcon: true,
      channelsList: [],
      active: "0",
      currentId: "",
      articlesData: {
        channel_id: "0",
        timestamp: new Date().getTime(),
      },
      articlesList: "",
      articleCoverImg: [],
    };
  },
  created() {
    this.getChannelsList();
    this.getArticlesList(this.articlesData);
  },
  methods: {
    async getChannelsList() {
      const res = await getChannelsList();
      this.channelsList = res.data.data.channels;
      // console.log(this.channelsList);
    },
    async getArticlesList(data) {
      const res = await getArticlesList(data);
      this.articlesList = res.data.data.results;
      console.log(this.articlesList);
    },
    changeChannels(id) {
      this.currentId = id;
      this.articlesData = {
        channel_id: id,
        timestamp: new Date().getTime(),
      };
      this.getArticlesList(this.articlesData);
    },
    async getArticlesDetail(id) {
      const res = await getArticlesDetail(id);
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.search-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 44px;
  padding: 0 50px;
  color: #fff;
  .van-search__content {
    background-color: #5babfb;
    text-align: center;
    /deep/.van-field__left-icon {
      position: absolute;
      left: 35%;
      .van-icon-search {
        color: #fff;
      }
    }
    /deep/.van-field__body {
      input {
        color: #fff;
      }
      input::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #fff;
        /* placeholder字体大小  */
        font-size: 14px;
        /* placeholder位置  */
        text-align: center;
      }
    }
  }
}
.container {
  margin-top: 44px;
  box-sizing: border-box;
  .art-list {
    padding: 0 12px;
    .art-item {
      background-color: #fff;
      width: 100%;
      padding: 15px 0;
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
        color: #b4b4b4;
        span {
          margin: 0 2px;
        }
      }
    }
  }
}
</style>
